import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  borderRadiusScale,
  borderRadiusUtility,
  borderWidthScale,
  borderWidthUtility,
  fontFamily,
  fontWeights,
  fontWeightUtility,
  letterSpacing,
  numberScale,
  semanticBorderTokens,
  spacingScale,
  spacingWidthUtility,
  textStyles,
  typeScale,
  typeSizeUtility,
} from './foundation-tokens';

/**
 * Structural check of the theme against the Figma snapshot.
 *
 * The snapshot in `artifacts/figma/typography-spacing-borders.json` is the Figma read-out; this
 * test asserts that `app/globals.css` reproduces it, that the layers stay distinguishable, and
 * that the token module describes exactly what the theme defines.
 *
 * It is the same contract `color-system/color-tokens.test.ts` holds the colour system to.
 */
type Snapshot = {
  source: { rootFontSizePx: number };
  typography: {
    fontFamily: { variable: string; value: string };
    weights: { name: string; label: string; value: number; figmaVariable: string }[];
    scale: {
      name: string;
      figmaFontSizeVariable: string;
      figmaLineHeightVariable: string;
      fontSize: { px: number; rem: string };
      lineHeight: { px: number; rem: string };
      paragraphSpacing: { px: number };
      figmaNodeId: string;
    }[];
    textStyles: { name: string; weight: string; size: string }[];
  };
  spacing: { scale: { alias: string; step: string; globalToken: string; px: number; rem: string; figmaNodeId: string }[] };
  borders: {
    radius: { scale: { alias: string; globalToken: string | null; px: number; figmaNodeId: string }[] };
    width: { scale: { alias: string; globalToken: string; px: number; figmaNodeId: string }[] };
    semantic: { variable: string; px: number; aliasOf: string; kind: string }[];
  };
  globalNumberScale: { steps: { token: string; px: number; rem: string }[] };
};

const snapshot: Snapshot = JSON.parse(fs.readFileSync('artifacts/figma/typography-spacing-borders.json', 'utf8'));
// Normalised to LF: the block slicing below looks for a `}` on its own line, and the
// working tree can hold either ending depending on core.autocrlf.
const css = fs.readFileSync('app/globals.css', 'utf8').replaceAll('\r\n', '\n');

/** The `@theme static` block, where every token in this system is declared. */
const themeBlock = css.slice(css.indexOf('@theme static {'), css.indexOf('\n}\n'));

const declarations = new Map(
  [...themeBlock.matchAll(/^\s*(--[a-z0-9\\.-]+(?:--[a-z-]+)?):\s*([^;]+);/gm)].map((match) => [
    match[1],
    match[2].trim(),
  ]),
);

/** Follows a `var(--…)` chain down to the literal value it ends at. */
function resolve(name: string, seen = new Set<string>()): string {
  expect(declarations.has(name), `${name} is not defined in app/globals.css`).toBe(true);
  expect(seen.has(name), `${name} is part of a circular alias chain`).toBe(false);
  seen.add(name);

  const value = declarations.get(name) as string;
  const alias = /^var\((--[a-z0-9\\.-]+)\)$/.exec(value);

  return alias ? resolve(alias[1], seen) : value;
}

const rootFontSize = snapshot.source.rootFontSizePx;

/** The literal a Figma px measurement is expected to be written as. */
function lengthFor(px: number, unit: 'rem' | 'px'): string {
  if (px === 0) {
    return '0rem';
  }

  return unit === 'px' ? `${px}px` : `${px / rootFontSize}rem`;
}

describe('layer 1 - the global number scale', () => {
  it('defines every Figma `number/*` step as a literal length', () => {
    expect(numberScale.map((step) => step.figmaToken)).toEqual(snapshot.globalNumberScale.steps.map((s) => s.token));

    for (const step of snapshot.globalNumberScale.steps) {
      const token = `--${step.token.replace('number/', 'number-')}`;
      const value = declarations.get(token);

      expect(value, token).toBe(step.token === 'number/px' ? '1px' : lengthFor(step.px, 'rem'));
      // A primitive is a value, never a reference: that is what makes the layer primitive.
      expect(value, `${token} must be a literal`).toMatch(/^[\d.]+(rem|px)$/);
    }
  });

  it('keeps Tailwind\'s dynamic spacing on the same base', () => {
    expect(declarations.get('--spacing')).toBe('var(--number-1)');
    expect(resolve('--spacing')).toBe(lengthFor(4, 'rem'));
  });
});

describe('typography', () => {
  it('names the typeface Figma names, loaded by the project\'s own font setup', () => {
    expect(fontFamily.figmaVariable).toBe(snapshot.typography.fontFamily.variable);
    expect(fontFamily.value).toBe(snapshot.typography.fontFamily.value);

    const declared = declarations.get(`--${fontFamily.token}`) as string;

    // The face comes from next/font, so the token references the variable layout.tsx sets
    // rather than naming a webfont of its own.
    expect(declared).toContain(`var(--${fontFamily.cssVariable})`);
    expect(fs.readFileSync('app/layout.tsx', 'utf8')).toContain(`variable: "--${fontFamily.cssVariable}"`);
  });

  it('defines the 13 Figma steps as literal font sizes and line heights', () => {
    expect(typeScale.map((size) => size.name)).toEqual(snapshot.typography.scale.map((size) => size.name));

    for (const size of snapshot.typography.scale) {
      expect(declarations.get(`--font-size-${size.name}`), `--font-size-${size.name}`).toBe(size.fontSize.rem);
      expect(declarations.get(`--line-height-${size.name}`), `--line-height-${size.name}`).toBe(size.lineHeight.rem);
    }
  });

  it('pairs every text token with its line height and letter spacing', () => {
    for (const size of snapshot.typography.scale) {
      // The style token references the primitive rather than repeating it, so a size and its
      // leading cannot be changed independently.
      expect(declarations.get(`--text-${size.name}`)).toBe(`var(--font-size-${size.name})`);
      expect(declarations.get(`--text-${size.name}--line-height`)).toBe(`var(--line-height-${size.name})`);
      expect(declarations.get(`--text-${size.name}--letter-spacing`)).toBe(`var(--${letterSpacing.token})`);

      expect(resolve(`--text-${size.name}`)).toBe(size.fontSize.rem);
      expect(resolve(`--text-${size.name}--line-height`)).toBe(size.lineHeight.rem);
    }

    expect(declarations.get(`--${letterSpacing.token}`)).toBe(letterSpacing.value);
  });

  it('derives paragraph spacing from the font size, as Figma does', () => {
    for (const size of snapshot.typography.scale) {
      expect(size.paragraphSpacing.px, `${size.name} paragraph spacing`).toBe(size.fontSize.px);
      expect(declarations.get(`--paragraph-spacing-${size.name}`)).toBe(`var(--font-size-${size.name})`);
    }
  });

  it('defines the four Figma weights', () => {
    expect(fontWeights.map((weight) => weight.figmaVariable)).toEqual(
      snapshot.typography.weights.map((weight) => weight.figmaVariable),
    );

    for (const weight of snapshot.typography.weights) {
      expect(declarations.get(`--font-weight-${weight.name}`), weight.figmaVariable).toBe(String(weight.value));
    }
  });

  it('covers all 52 Figma text styles as compositions of the size and weight tokens', () => {
    expect(textStyles.map((style) => style.name).sort()).toEqual(
      snapshot.typography.textStyles.map((style) => style.name).sort(),
    );
    expect(textStyles).toHaveLength(52);

    for (const style of textStyles) {
      expect(style.classNames).toBe(
        `font-${fontFamily.token.replace('font-', '')} ${typeSizeUtility[style.size]} ${fontWeightUtility[style.weight]}`,
      );
    }
  });
});

describe('spacing', () => {
  it('covers the 35 steps of the Figma table', () => {
    expect(spacingScale.map((step) => step.figmaAlias)).toEqual(snapshot.spacing.scale.map((step) => step.alias));
    expect(spacingScale.map((step) => step.figmaNodeId)).toEqual(snapshot.spacing.scale.map((step) => step.figmaNodeId));
  });

  it('aliases a `number/*` step rather than repeating its value', () => {
    for (const [index, step] of snapshot.spacing.scale.entries()) {
      const token = `--${spacingScale[index].token.replace('.', '\\.')}`;

      expect(declarations.get(token), token).toBe(`var(--number-${step.step})`);
      expect(resolve(token)).toBe(step.step === 'px' ? '1px' : lengthFor(step.px, 'rem'));
      expect(spacingScale[index].figmaGlobalToken).toBe(step.globalToken);
    }
  });

  it('exposes every step as a utility Tailwind can see', () => {
    for (const step of spacingScale) {
      expect(spacingWidthUtility[step.step], step.figmaAlias).toBe(`w-${step.step}`);
    }
  });
});

describe('borders', () => {
  it('keeps radius and width as two separate scales over one number scale', () => {
    expect(borderRadiusScale.map((step) => step.figmaAlias)).toEqual(
      snapshot.borders.radius.scale.map((step) => step.alias),
    );
    expect(borderWidthScale.map((step) => step.figmaAlias)).toEqual(
      snapshot.borders.width.scale.map((step) => step.alias),
    );

    // Neither family may borrow the other's token names.
    const radiusTokens = new Set(borderRadiusScale.map((step) => step.token));
    const widthTokens = new Set(borderWidthScale.map((step) => step.token));

    expect([...radiusTokens].some((token) => widthTokens.has(token))).toBe(false);
  });

  it('defines every radius step, aliasing the number scale where Figma names one', () => {
    for (const [index, step] of snapshot.borders.radius.scale.entries()) {
      const token = `--${borderRadiusScale[index].token}`;
      const declared = declarations.get(token);

      if (step.globalToken === null) {
        // rounded-full is the one radius the table gives no global token; it is a literal.
        expect(declared, token).toBe(`${step.px}px`);
      } else {
        expect(declared, token).toBe(`var(--number-${step.globalToken.replace('number/', '')})`);
        expect(resolve(token)).toBe(lengthFor(step.px, 'rem'));
      }
    }
  });

  it('defines every width step, resolving the `number/0-51` typo to the 2px step', () => {
    for (const [index, step] of snapshot.borders.width.scale.entries()) {
      const entry = borderWidthScale[index];
      const token = `--${entry.token}`;

      // The Figma spelling is preserved rather than corrected in place.
      expect(entry.figmaGlobalToken).toBe(step.globalToken);
      expect(declarations.get(token), token).toBe(`var(--${entry.numberToken})`);
      expect(resolve(token)).toBe(step.px === 1 ? '1px' : lengthFor(step.px, 'rem'));
    }

    const two = borderWidthScale.find((step) => step.figmaAlias === 'border-2');

    expect(two?.figmaGlobalToken).toBe('number/0-51');
    expect(two?.numberToken).toBe('number-0-5');
  });

  it('resolves the semantic roles through an alias token', () => {
    expect(semanticBorderTokens.map((token) => token.figmaVariable)).toEqual(
      snapshot.borders.semantic.map((token) => token.variable),
    );

    for (const [index, role] of snapshot.borders.semantic.entries()) {
      const token = semanticBorderTokens[index];

      expect(token.px).toBe(role.px);
      expect(token.kind).toBe(role.kind);
      expect(resolve(`--${token.token}`)).toBe(
        role.px === 9999 ? '9999px' : role.px === 1 ? '1px' : lengthFor(role.px, 'rem'),
      );
    }

    // border/radius/default must point at an alias token, not at a length of its own.
    expect(declarations.get('--radius-default')).toBe('var(--radius-base)');
    expect(declarations.get('--border-width-default')).toBe('var(--border-width-1)');
  });

  it('gives the width tokens a utility, since Tailwind v4 has no border-width namespace', () => {
    expect(css).toContain('@utility border-w-* {');
    expect(css).toContain('border-width: --value(--border-width-*);');

    for (const step of borderWidthScale) {
      expect(borderWidthUtility[step.token.replace('border-width-', '')]).toBe(
        `border-w-${step.token.replace('border-width-', '')}`,
      );
    }

    for (const step of borderRadiusScale) {
      expect(borderRadiusUtility[step.token.replace('radius-', '')]).toBe(
        `rounded-${step.token.replace('radius-', '')}`,
      );
    }
  });
});

describe('theme completeness', () => {
  it('declares every token the module describes, and nothing it does not', () => {
    const described = new Set<string>([
      '--spacing',
      ...numberScale.map((step) => `--${step.token}`),
      ...typeScale.flatMap((size) => [
        `--${size.fontSizeToken}`,
        `--${size.lineHeightToken}`,
        `--${size.paragraphSpacingToken}`,
        `--${size.token}`,
        `--${size.token}--line-height`,
        `--${size.token}--letter-spacing`,
      ]),
      ...fontWeights.map((weight) => `--${weight.token}`),
      `--${fontFamily.token}`,
      `--${letterSpacing.token}`,
      ...spacingScale.map((step) => `--${step.token.replace('.', '\\.')}`),
      ...borderRadiusScale.map((step) => `--${step.token}`),
      ...borderWidthScale.map((step) => `--${step.token}`),
      '--radius-default',
      '--border-width-default',
    ]);

    const declared = [...declarations.keys()].filter((name) => !name.startsWith('--color-'));

    expect(declared.sort()).toEqual([...described].sort());
  });

  it('defines the 129 typography, spacing and border tokens of the Figma system', () => {
    // 35 number steps, 13 sizes x (font size, line height, paragraph spacing), 4 weights,
    // 35 spacing steps, 9 radii, 5 widths, and the two semantic roles that need a token of
    // their own (border/radius/full shares --radius-full with the alias of the same name).
    const figmaTokens =
      snapshot.globalNumberScale.steps.length +
      snapshot.typography.scale.length * 3 +
      snapshot.typography.weights.length +
      snapshot.spacing.scale.length +
      snapshot.borders.radius.scale.length +
      snapshot.borders.width.scale.length +
      2;

    expect(figmaTokens).toBe(129);

    // Plus the 13 text style tokens with their two modifiers each, the font family, the
    // letter spacing, and Tailwind's dynamic spacing base.
    const declared = [...declarations.keys()].filter((name) => !name.startsWith('--color-'));

    expect(declared).toHaveLength(figmaTokens + snapshot.typography.scale.length * 3 + 3);
  });
});
