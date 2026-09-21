import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  baseTokens,
  colorModes,
  colorShades,
  primitiveFamilies,
  roleStates,
  roleTokenGroups,
  semanticFamilies,
  type ColorShade,
} from './color-tokens';

/**
 * Structural check of the theme against the Figma snapshot.
 *
 * The snapshot in `artifacts/figma/color-system.json` is the Figma read-out; this test asserts
 * that `app/globals.css` reproduces it, that the three layers stay distinguishable, and that the
 * token module describes exactly what the theme defines.
 */
type Snapshot = {
  scaleOrder: { shades: string[] };
  primitives: {
    base: Record<string, string>;
    families: { name: string; label: string; figmaNodeId: string; shades: Record<string, string> }[];
  };
  semanticFamilies: { name: string; label: string; primitive: string; figmaNodeId: string }[];
  roleTokens: {
    states: string[];
    groups: {
      name: string;
      tokens: {
        token: string;
        figmaVariable: string;
        light: { figmaRef: string | null; aliasOf: string | null; hex: string };
        dark: { figmaRef: string | null; aliasOf: string | null; hex: string };
      }[];
    }[];
  };
};

const snapshot: Snapshot = JSON.parse(fs.readFileSync('artifacts/figma/color-system.json', 'utf8'));
const css = fs.readFileSync('app/globals.css', 'utf8');

function declarationsIn(source: string): Map<string, string> {
  return new Map([...source.matchAll(/^\s*(--color-[a-z0-9-]+):\s*([^;]+);/gm)].map((match) => [match[1], match[2].trim()]));
}

/** The `@theme static` block: layers 1 and 2, and the light value of every role token. */
const themeBlock = css.slice(css.indexOf('@theme static {'), css.indexOf('\n}\n'));

/** The dark overrides, taken from the `[data-theme="dark"]` rule. */
const darkBlock = css.slice(css.indexOf('[data-theme="dark"] {'), css.indexOf('[data-theme="light"] {'));

const declarations = declarationsIn(themeBlock);
const darkOverrides = declarationsIn(darkBlock);

const lightDeclarations = declarations;
const darkDeclarations = new Map([...declarations, ...darkOverrides]);

/** Follows a `var(--color-…)` chain down to the literal value it ends at. */
function resolve(name: string, seen = new Set<string>(), scope = declarations): string {
  expect(scope.has(name), `${name} is not defined in app/globals.css`).toBe(true);
  expect(seen.has(name), `${name} is part of a circular alias chain`).toBe(false);
  seen.add(name);

  const value = scope.get(name) as string;
  const alias = /^var\((--color-[a-z0-9-]+)\)$/.exec(value);

  return alias ? resolve(alias[1], seen, scope) : value;
}

describe('layer 1 - primitive palette', () => {
  it('defines both base values as literals', () => {
    for (const { token, label } of baseTokens) {
      const key = label.toLowerCase();
      expect(declarations.get(`--color-${token}`)).toBe(snapshot.primitives.base[key]);
    }
  });

  it('defines all 22 Figma ramps as literal hex values', () => {
    expect(primitiveFamilies.map((family) => family.name)).toEqual(
      snapshot.primitives.families.map((family) => family.name),
    );

    for (const family of snapshot.primitives.families) {
      for (const shade of colorShades) {
        const value = declarations.get(`--color-${family.name}-${shade}`);

        expect(value, `--color-${family.name}-${shade}`).toBe(family.shades[shade]);
        // A primitive is a value, never a reference: that is what makes the layer primitive.
        expect(value, `--color-${family.name}-${shade} must be a literal`).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it('keeps the Figma shade order and node ids', () => {
    expect([...colorShades]).toEqual(snapshot.scaleOrder.shades);

    for (const family of primitiveFamilies) {
      const source = snapshot.primitives.families.find((entry) => entry.name === family.name);

      expect(family.figmaNodeId).toBe(source?.figmaNodeId);
      // Integer-like keys enumerate in ascending order, so compare them as a set.
      expect(Object.keys(family.shadeNodeIds).sort()).toEqual([...snapshot.scaleOrder.shades].sort());
    }
  });
});

describe('layer 2 - semantic families', () => {
  it('mirrors the Figma classification', () => {
    expect(semanticFamilies.map((family) => `${family.name}:${family.primitive}`)).toEqual(
      snapshot.semanticFamilies.map((family) => `${family.name}:${family.primitive}`),
    );
  });

  it('aliases a primitive ramp rather than repeating its values', () => {
    for (const family of semanticFamilies) {
      for (const shade of colorShades) {
        // The declaration itself must be the reference - a copied hex would look identical
        // once resolved, but would silently stop tracking the primitive.
        expect(declarations.get(`--color-${family.name}-${shade}`), `--color-${family.name}-${shade}`).toBe(
          `var(--color-${family.primitive}-${shade})`,
        );
      }
    }
  });

  it('resolves to the Figma values of the ramp it classifies', () => {
    for (const family of semanticFamilies) {
      const source = snapshot.primitives.families.find((entry) => entry.name === family.primitive);

      for (const shade of colorShades) {
        expect(resolve(`--color-${family.name}-${shade}`)).toBe(source?.shades[shade]);
      }
    }
  });
});

describe('layer 3 - role tokens', () => {
  it('covers every token on the Figma Color Tokens page', () => {
    expect(roleTokenGroups.map((group) => group.name)).toEqual(
      snapshot.roleTokens.groups.map((group) => group.name),
    );

    for (const [index, group] of roleTokenGroups.entries()) {
      expect(group.tokens.map((role) => role.figmaVariable)).toEqual(
        snapshot.roleTokens.groups[index].tokens.map((role) => role.figmaVariable),
      );
    }

    // 6 background families x invert x 5 states, plus surface and transparent, plus
    // 13 text, 12 text-invert and 9 border roles.
    expect(roleTokenGroups.reduce((total, group) => total + group.tokens.length, 0)).toBe(96);
    expect([...roleStates]).toEqual(snapshot.roleTokens.states);
  });

  it('resolves to the Figma value in both modes', () => {
    for (const [index, group] of roleTokenGroups.entries()) {
      const source = snapshot.roleTokens.groups[index];

      for (const [position, role] of group.tokens.entries()) {
        const figma = source.tokens[position];

        for (const mode of colorModes) {
          const side = role[mode];
          const declarations = mode === 'light' ? lightDeclarations : darkDeclarations;
          const declaration = declarations.get(`--color-${role.token}`);

          expect(declaration, `--color-${role.token} (${mode})`).toBeDefined();

          if (side.aliasOf === null) {
            // color/background/transparent is the one role Figma gives a literal value.
            expect(declaration).toBe(figma[mode].hex);
          } else {
            expect(declaration).toBe(`var(--color-${side.aliasOf})`);
            expect(resolve(`--color-${role.token}`, new Set(), declarations)).toBe(figma[mode].hex);
          }
        }
      }
    }
  });

  it('aliases the ramp the Figma table names, semantic or primitive', () => {
    const semanticNames = new Set(semanticFamilies.map((family) => family.name));
    const primitiveNames = new Set(primitiveFamilies.map((family) => family.name));

    for (const group of roleTokenGroups) {
      for (const role of group.tokens) {
        for (const mode of colorModes) {
          const side = role[mode];

          if (side.aliasOf === null || side.aliasOf.startsWith('base-')) {
            continue;
          }

          const family = side.aliasOf.slice(0, side.aliasOf.lastIndexOf('-'));
          const shade = side.aliasOf.slice(side.aliasOf.lastIndexOf('-') + 1) as ColorShade;
          const ramp = (side.figmaRef as string).split('/')[0];

          // The tables write the classified ramps by semantic name, `neutral` standing for the
          // classification's `default` family, and name a primitive ramp where they mean one
          // (`blue` for links, `purple` for visited, `gray` for the dark border base).
          expect(semanticNames.has(family) || primitiveNames.has(family), `${role.token} -> ${side.aliasOf}`).toBe(
            true,
          );
          expect(family, `${role.token} (${mode}) tracks ${side.figmaRef}`).toBe(
            ramp === 'neutral' ? 'default' : ramp,
          );
          expect(colorShades).toContain(shade);
        }
      }
    }
  });

  it('only redefines a token in dark mode when Figma gives it a different value', () => {
    for (const group of roleTokenGroups) {
      for (const role of group.tokens) {
        const sameInBothModes = role.light.aliasOf === role.dark.aliasOf;

        expect(darkOverrides.has(`--color-${role.token}`), `--color-${role.token} dark override`).toBe(
          !sameInBothModes,
        );
      }
    }
  });
});

describe('theme completeness', () => {
  it('defines nothing the token module does not describe, and nothing less', () => {
    const described = new Set<string>([
      ...baseTokens.map((base) => `--color-${base.token}`),
      ...primitiveFamilies.flatMap((family) => colorShades.map((shade) => `--color-${family.name}-${shade}`)),
      ...semanticFamilies.flatMap((family) => colorShades.map((shade) => `--color-${family.name}-${shade}`)),
      ...roleTokenGroups.flatMap((group) => group.tokens.map((role) => `--color-${role.token}`)),
    ]);

    expect([...declarations.keys()].sort()).toEqual([...described].sort());
  });

  it('defines the 406 colour tokens of the Figma system', () => {
    const figmaTokens =
      Object.keys(snapshot.primitives.base).length +
      snapshot.primitives.families.length * colorShades.length +
      snapshot.semanticFamilies.length * colorShades.length +
      snapshot.roleTokens.groups.reduce((total, group) => total + group.tokens.length, 0);

    expect(figmaTokens).toBe(406);
    expect(declarations.size).toBe(figmaTokens);
  });
});
