import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import {
  colorModes,
  colorShades,
  primitiveFamilies,
  roleStates,
  roleTokenGroups,
  semanticFamilies,
} from '@/components/design-system/color-system';

/**
 * Browser verification of the Plus UI colour system.
 *
 * Expected values come from `artifacts/expected/color-system/tokens.json`, generated from the
 * Figma snapshot in `artifacts/figma/color-system.json` - not from the implementation.
 */
type Described = { hex: string; css: string; figmaRef?: string | null };

type ExpectedTokens = {
  paletteTokenCount: number;
  roleTokenCount: number;
  tokens: Record<string, Described>;
  roles: Record<string, { figmaVariable: string; group: string; light: Described; dark: Described }>;
  aliases: {
    semantic: Record<string, string>;
    role: Record<string, { light: string | null; dark: string | null }>;
  };
};

const expected: ExpectedTokens = JSON.parse(
  fs.readFileSync('artifacts/expected/color-system/tokens.json', 'utf8'),
);

type Measured = {
  backgroundColor: string;
  height: number;
  borderRadius: string;
  borderTopWidth: string;
  borderTopColor: string;
  nodeId: string | null;
  printed: string;
  labelColor: string;
  labelFont: string;
  labelSize: string;
  labelWeight: string;
  labelLineHeight: string;
  valueColor: string;
};

/**
 * Every chip on the page, keyed by token - and by `token@light` / `token@dark` for the role
 * tokens, which the tables render once per mode inside `data-theme`.
 */
async function measureSwatches(page: import('@playwright/test').Page) {
  // The printed value is read from the resolved computed style after hydration.
  await page.waitForFunction(
    () =>
      Array.from(document.querySelectorAll('[data-color-value]')).every(
        (element) => (element.textContent ?? '').startsWith('#'),
      ),
    undefined,
    { timeout: 30_000 },
  );

  return page.evaluate(() => {
    const result: Record<string, unknown> = {};

    for (const swatch of Array.from(document.querySelectorAll('[data-color-token]'))) {
      const token = swatch.getAttribute('data-color-token') as string;
      const mode = swatch.getAttribute('data-color-mode');
      const chip = swatch.querySelector('div') as HTMLElement;
      const label = swatch.querySelector('span') as HTMLElement;
      const value = swatch.querySelector('[data-color-value]') as HTMLElement;
      const chipStyle = getComputedStyle(chip);
      const labelStyle = getComputedStyle(label);

      result[mode ? `${token}@${mode}` : token] = {
        backgroundColor: chipStyle.backgroundColor,
        height: chip.getBoundingClientRect().height,
        borderRadius: chipStyle.borderRadius,
        borderTopWidth: chipStyle.borderTopWidth,
        borderTopColor: chipStyle.borderTopColor,
        nodeId: chip.getAttribute('data-node-id'),
        printed: value.textContent ?? '',
        labelColor: labelStyle.color,
        labelFont: labelStyle.fontFamily,
        labelSize: labelStyle.fontSize,
        labelWeight: labelStyle.fontWeight,
        labelLineHeight: labelStyle.lineHeight,
        valueColor: getComputedStyle(value).color,
      };
    }

    return result as Record<string, Measured>;
  });
}

test('every palette token resolves to its Figma value', async ({ page }) => {
  await page.goto('http://localhost:3000/colors');

  const measured = await measureSwatches(page);

  // 2 base + 22x11 primitive + 6x11 semantic.
  expect(Object.keys(expected.tokens)).toHaveLength(expected.paletteTokenCount);
  expect(expected.paletteTokenCount).toBe(310);

  for (const [token, figma] of Object.entries(expected.tokens)) {
    const actual = measured[token];

    expect(actual, `no swatch rendered for --color-${token}`).toBeDefined();
    expect(actual.backgroundColor, `--color-${token} background`).toBe(figma.css);

    // The readout is taken from the resolved style, so it doubles as proof that the story
    // shows the theme's value rather than a copy of the Figma hex.
    expect(actual.printed.toLowerCase(), `--color-${token} printed value`).toBe(figma.hex.toLowerCase());
  }
});

test('every role token resolves to its Figma value in both modes', async ({ page }) => {
  await page.goto('http://localhost:3000/colors');

  const measured = await measureSwatches(page);

  // 6 background families x invert x 5 states + surface + transparent + 13 text + 12 text-invert + 9 border.
  expect(Object.keys(expected.roles)).toHaveLength(expected.roleTokenCount);
  expect(expected.roleTokenCount).toBe(96);
  expect([...roleStates]).toEqual(['default', 'hovered', 'pressed', 'focused', 'loading']);

  for (const [token, role] of Object.entries(expected.roles)) {
    for (const mode of colorModes) {
      const actual = measured[`${token}@${mode}`];
      const figma = role[mode];

      expect(actual, `no ${mode} swatch rendered for --color-${token}`).toBeDefined();
      expect(actual.backgroundColor, `--color-${token} (${mode}) background`).toBe(figma.css);
      expect(actual.printed.toLowerCase(), `--color-${token} (${mode}) printed value`).toBe(figma.hex.toLowerCase());
    }
  }
});

test('semantic and role tokens stay aliases of the layer below', async ({ page }) => {
  await page.goto('http://localhost:3000/colors');

  const measured = await measureSwatches(page);

  for (const [semantic, primitive] of Object.entries(expected.aliases.semantic)) {
    expect(measured[semantic].backgroundColor, `${semantic} vs ${primitive}`).toBe(
      measured[primitive].backgroundColor,
    );
  }

  for (const [token, alias] of Object.entries(expected.aliases.role)) {
    for (const mode of colorModes) {
      const aliasOf = alias[mode];

      if (aliasOf === null) {
        continue;
      }

      expect(measured[`${token}@${mode}`].backgroundColor, `${token} (${mode}) vs ${aliasOf}`).toBe(
        measured[aliasOf].backgroundColor,
      );
    }
  }

  // Both palette layers are present and separately addressable - the system is not flattened.
  const semanticNames = semanticFamilies.map((family) => family.name);
  const primitiveNames = primitiveFamilies.map((family) => family.name);

  expect(semanticNames).toEqual(['default', 'primary', 'info', 'success', 'warning', 'danger']);
  expect(primitiveNames).toHaveLength(22);
  expect(semanticNames.some((name) => primitiveNames.includes(name))).toBe(false);

  for (const family of semanticFamilies) {
    await expect(page.locator(`[data-semantic-family="${family.name}"]`)).toHaveAttribute(
      'data-node-id',
      family.figmaNodeId,
    );
  }
});

test('swatches carry the Figma geometry and node ids', async ({ page }) => {
  await page.goto('http://localhost:3000/colors');

  const measured = await measureSwatches(page);

  for (const [key, actual] of Object.entries(measured)) {
    // Figma: 57px tall, border/radius/default 4px, 1px rgba(255,255,255,0.1) hairline.
    expect(actual.height, `${key} height`).toBe(57);
    expect(actual.borderRadius, `${key} radius`).toBe('4px');
    expect(actual.borderTopWidth, `${key} border width`).toBe('1px');
    expect(actual.borderTopColor, `${key} border colour`).toBe('rgba(255, 255, 255, 0.1)');

    // Figma Detail row: Medium/text-base in color/text/default over color/text/caption.
    expect(actual.labelFont, `${key} label font`).toBe('Inter, "Inter Fallback"');
    expect(actual.labelSize, `${key} label size`).toBe('16px');
    expect(actual.labelLineHeight, `${key} label line height`).toBe('24px');
    expect(actual.labelWeight, `${key} label weight`).toBe('500');
  }

  // Captions render in color/text/default over color/text/caption, and stay in the page's own
  // mode even for a dark-pinned chip, so the Dark column reads like the Figma table.
  for (const key of ['gray-950', 'text-default@light', 'text-default@dark']) {
    expect(measured[key].labelColor, `${key} label colour`).toBe(expected.roles['text-default'].light.css);
    expect(measured[key].valueColor, `${key} value colour`).toBe(expected.roles['text-caption'].light.css);
  }

  // Primitive swatches map back to their Figma rectangle.
  for (const family of primitiveFamilies) {
    for (const shade of colorShades) {
      expect(measured[`${family.name}-${shade}`].nodeId, `${family.name}-${shade} node id`).toBe(
        family.shadeNodeIds[shade],
      );
    }

    await expect(page.locator(`[data-color-ramp="${family.name}"]`)).toHaveAttribute(
      'data-node-id',
      family.figmaNodeId,
    );
  }

  // Role token groups map back to the variable table they were read from.
  for (const group of roleTokenGroups) {
    await expect(page.locator(`[data-role-group="${group.name}"]`)).toHaveAttribute(
      'data-node-id',
      group.figmaNodeId,
    );
  }
});

test('Tailwind utilities resolve to the theme tokens', async ({ page }) => {
  await page.goto('http://localhost:3000/colors');

  // bg-background-surface / bg-background-default-default on the documentation frames.
  await expect(page.locator('[data-node-id="4922:7320"]')).toHaveCSS(
    'background-color',
    expected.roles['background-surface'].light.css,
  );
  await expect(page.locator('[data-node-id="4922:8423"]')).toHaveCSS(
    'background-color',
    expected.roles['background-default-default'].light.css,
  );
  await expect(page.locator('[data-node-id="4922:6167"]')).toHaveCSS(
    'background-color',
    expected.roles['background-surface'].light.css,
  );

  // text-text-default / text-text-caption on the copy taken from Figma.
  await expect(page.locator('[data-node-id="4922:8423"] h2')).toHaveCSS(
    'color',
    expected.roles['text-default'].light.css,
  );
  await expect(page.locator('[data-color-token="gray-950"] [data-color-value]')).toHaveCSS(
    'color',
    expected.roles['text-caption'].light.css,
  );
});

test('renders the classified families and role tables as documented in Figma', async ({ page }) => {
  await page.goto('http://localhost:3000/colors');

  for (const group of roleTokenGroups) {
    const table = page.locator(`[data-role-group="${group.name}"]`);

    await expect(table).toBeVisible();
    // One chip per mode for every token in the group.
    await expect(table.locator('[data-color-token]')).toHaveCount(group.tokens.length * colorModes.length);
  }

  const defaultFamily = page.locator('[data-semantic-family="default"]');

  await expect(defaultFamily.getByRole('heading', { name: 'Default (Neutral)' })).toBeVisible();
  await expect(defaultFamily.locator('[data-color-token]')).toHaveCount(colorShades.length);

  await measureSwatches(page);

  // The Next.js dev indicator is an overlay portal, not part of the design.
  await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });

  await expect(defaultFamily).toHaveScreenshot('color-classification-default.png');
  await expect(page.locator('[data-role-group="border"]')).toHaveScreenshot('color-tokens-border.png');
});
