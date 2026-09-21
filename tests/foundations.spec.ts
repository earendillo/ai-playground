import fs from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import {
  borderRadiusScale,
  borderWidthScale,
  fontWeights,
  numberScale,
  semanticBorderTokens,
  spacingScale,
  textStyles,
  typeScale,
} from '@/components/design-system/foundations';

/**
 * Browser verification of the Plus UI typography, spacing and border systems.
 *
 * Expected values come from `artifacts/expected/foundations/tokens.json`, generated from the
 * Figma snapshot in `artifacts/figma/typography-spacing-borders.json` - not from the
 * implementation. Each page draws its tokens with the real Tailwind utilities, so measuring
 * the rendered elements is at the same time a check that the utilities resolve to the theme.
 */
type Expected = {
  rootFontSizePx: number;
  fontFamily: { family: string };
  typeScale: Record<string, { fontSize: string; lineHeight: string; letterSpacing: string; paragraphSpacing: string }>;
  fontWeights: Record<string, string>;
  textStyles: Record<string, { fontSize: string; lineHeight: string; fontWeight: string }>;
  numberScale: Record<string, string>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  borderWidth: Record<string, string>;
  semanticBorders: Record<string, string>;
  counts: Record<string, number>;
};

const expected: Expected = JSON.parse(fs.readFileSync('artifacts/expected/foundations/tokens.json', 'utf8'));

/**
 * Chrome serialises `letter-spacing: 0em` as `normal`, which is the same value written a
 * different way. That is the only representation the comparison normalises; the expected
 * value stays the `0` Figma declares.
 */
function normalizeLetterSpacing(value: string): string {
  return value === 'normal' ? '0px' : value;
}

/** Reads one computed property off every element carrying `attribute`, keyed by its value. */
function measure(page: Page, attribute: string, properties: string[]) {
  return page.evaluate(
    ([attributeName, propertyNames]) => {
      const result: Record<string, Record<string, string>> = {};

      for (const element of Array.from(document.querySelectorAll(`[${attributeName}]`))) {
        const key = element.getAttribute(attributeName) as string;
        const style = getComputedStyle(element);

        result[key] = Object.fromEntries(
          (propertyNames as string[]).map((property) => [property, style.getPropertyValue(property).trim()]),
        );
      }

      return result;
    },
    [attribute, properties] as const,
  );
}

/** The value each `data-readout` printed, so the page can be checked against its own samples. */
function readouts(page: Page) {
  return page.evaluate(() =>
    Object.fromEntries(
      Array.from(document.querySelectorAll('[data-readout]')).map((element) => [
        element.getAttribute('data-readout') as string,
        (element.textContent ?? '').trim(),
      ]),
    ),
  );
}

/** The readouts are written by a client effect, so wait for them to stop showing the dash. */
async function waitForReadouts(page: Page) {
  await page.waitForFunction(
    () =>
      Array.from(document.querySelectorAll('[data-readout]')).every(
        (element) => (element.textContent ?? '').trim() !== '—',
      ),
    undefined,
    { timeout: 30_000 },
  );
}

test.describe('typography', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/typography');
    await waitForReadouts(page);
  });

  test('every step of the type scale resolves to its Figma size and leading', async ({ page }) => {
    const measured = await measure(page, 'data-type-sample', ['font-size', 'line-height', 'letter-spacing']);
    const spacing = await measure(page, 'data-paragraph-spacing', ['height']);

    expect(Object.keys(expected.typeScale)).toHaveLength(expected.counts.typeSizes);
    expect(expected.counts.typeSizes).toBe(13);

    for (const size of typeScale) {
      const figma = expected.typeScale[size.name];
      const actual = measured[size.name];

      expect(actual, `no sample rendered for text-${size.name}`).toBeDefined();
      expect(actual['font-size'], `text-${size.name} font size`).toBe(figma.fontSize);
      expect(actual['line-height'], `text-${size.name} line height`).toBe(figma.lineHeight);
      expect(normalizeLetterSpacing(actual['letter-spacing']), `text-${size.name} letter spacing`).toBe(
        figma.letterSpacing,
      );
      expect(spacing[size.name].height, `text-${size.name} paragraph spacing`).toBe(figma.paragraphSpacing);
    }
  });

  test('the four Figma weights resolve to their numeric values', async ({ page }) => {
    const measured = await measure(page, 'data-font-weight-sample', ['font-weight']);

    for (const weight of fontWeights) {
      expect(measured[weight.name]['font-weight'], `${weight.label} (${weight.figmaVariable})`).toBe(
        expected.fontWeights[weight.name],
      );
    }
  });

  test('all 52 text styles typeset as Figma defines them', async ({ page }) => {
    const measured = await measure(page, 'data-text-style-sample', ['font-size', 'line-height', 'font-weight']);

    expect(Object.keys(expected.textStyles)).toHaveLength(52);
    expect(textStyles).toHaveLength(52);

    for (const style of textStyles) {
      const figma = expected.textStyles[style.name];
      const actual = measured[style.name];

      expect(actual, `no sample rendered for ${style.name}`).toBeDefined();
      expect(actual['font-size'], `${style.name} font size`).toBe(figma.fontSize);
      expect(actual['line-height'], `${style.name} line height`).toBe(figma.lineHeight);
      expect(actual['font-weight'], `${style.name} weight`).toBe(figma.fontWeight);
    }
  });

  test('the typeface is the one Figma names', async ({ page }) => {
    const specimen = page.locator('[data-font-specimen]');

    // next/font provides the metric-matched fallback; the theme token must not substitute a
    // different face ahead of Inter.
    await expect(specimen).toHaveCSS('font-family', /^Inter(,|$)/);
    expect(expected.fontFamily.family).toBe('Inter');
  });

  test('the page prints the values it rendered, not a copy of the design file', async ({ page }) => {
    const measured = await measure(page, 'data-type-sample', ['font-size', 'line-height']);
    const printed = await readouts(page);

    for (const size of typeScale) {
      expect(printed[`font-size-${size.name}`]).toBe(measured[size.name]['font-size']);
      expect(printed[`line-height-${size.name}`]).toBe(measured[size.name]['line-height']);
    }
  });
});

test.describe('spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/spacing');
    await waitForReadouts(page);
  });

  test('every step of the scale resolves to its Figma value', async ({ page }) => {
    const measured = await measure(page, 'data-spacing-bar', ['width']);

    expect(Object.keys(expected.spacing)).toHaveLength(expected.counts.spacingSteps);
    expect(expected.counts.spacingSteps).toBe(35);

    for (const step of spacingScale) {
      const actual = measured[step.step];

      expect(actual, `no bar rendered for ${step.figmaAlias}`).toBeDefined();
      // Drawn with `w-<step>`, so this is also proof the utility reads the theme token.
      expect(actual.width, `${step.figmaAlias} (w-${step.step})`).toBe(expected.spacing[step.step]);
    }
  });

  test('the global number scale resolves to the same values', async ({ page }) => {
    const measured = await measure(page, 'data-number-bar', ['width']);

    for (const step of numberScale) {
      expect(measured[step.token].width, step.figmaToken).toBe(expected.numberScale[step.token]);
    }

    // Spacing is an alias layer over the number scale, not a second scale.
    for (const step of spacingScale) {
      expect(expected.spacing[step.step], `${step.figmaAlias} vs ${step.figmaGlobalToken}`).toBe(
        expected.numberScale[step.numberToken],
      );
    }
  });

  test('the page prints the widths it rendered', async ({ page }) => {
    const measured = await measure(page, 'data-spacing-bar', ['width']);
    const printed = await readouts(page);

    for (const step of spacingScale) {
      expect(printed[`spacing-${step.step}`]).toBe(measured[step.step].width);
    }
  });
});

test.describe('borders', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/borders');
    await waitForReadouts(page);
  });

  test('every border radius resolves to its Figma value', async ({ page }) => {
    const measured = await measure(page, 'data-radius-sample', ['border-top-left-radius']);

    expect(Object.keys(expected.borderRadius)).toHaveLength(expected.counts.borderRadiusSteps);
    expect(expected.counts.borderRadiusSteps).toBe(9);

    for (const step of borderRadiusScale) {
      expect(measured[step.token]['border-top-left-radius'], `${step.figmaAlias} (${step.utility})`).toBe(
        expected.borderRadius[step.token],
      );
    }
  });

  test('every border width resolves to its Figma value', async ({ page }) => {
    const measured = await measure(page, 'data-width-sample', ['border-top-width']);

    expect(Object.keys(expected.borderWidth)).toHaveLength(expected.counts.borderWidthSteps);
    expect(expected.counts.borderWidthSteps).toBe(5);

    for (const step of borderWidthScale) {
      // `border-w-*` is the project's own utility; this is what proves it reads the token.
      expect(measured[step.token]['border-top-width'], `${step.figmaAlias} (${step.utility})`).toBe(
        expected.borderWidth[step.token],
      );
    }
  });

  test('radius and width stay separate scales over one number scale', async ({ page }) => {
    const radii = await measure(page, 'data-radius-sample', ['border-top-left-radius']);
    const widths = await measure(page, 'data-width-sample', ['border-top-width']);

    // Every step that names a global token must agree with that step of the number scale.
    for (const step of borderRadiusScale) {
      if (step.numberToken) {
        expect(radii[step.token]['border-top-left-radius'], `${step.figmaAlias} vs ${step.figmaGlobalToken}`).toBe(
          expected.numberScale[step.numberToken],
        );
      }
    }

    for (const step of borderWidthScale) {
      expect(widths[step.token]['border-top-width'], `${step.figmaAlias} vs ${step.numberToken}`).toBe(
        expected.numberScale[step.numberToken as string],
      );
    }

    const radiusTokens = new Set(borderRadiusScale.map((step) => step.token));

    expect(borderWidthScale.some((step) => radiusTokens.has(step.token))).toBe(false);
  });

  test('the semantic roles resolve through their alias tokens', async ({ page }) => {
    const measured = await measure(page, 'data-semantic-border-sample', [
      'border-top-left-radius',
      'border-top-width',
    ]);

    expect(semanticBorderTokens).toHaveLength(expected.counts.semanticBorderTokens);

    for (const token of semanticBorderTokens) {
      const property = token.kind === 'radius' ? 'border-top-left-radius' : 'border-top-width';

      expect(measured[token.token][property], token.figmaVariable).toBe(expected.semanticBorders[token.token]);
    }

    // border/radius/default is the `rounded` step and border/width/default the `border` step.
    expect(expected.semanticBorders['radius-default']).toBe(expected.borderRadius['radius-base']);
    expect(expected.semanticBorders['border-width-default']).toBe(expected.borderWidth['border-width-1']);
  });
});

test.describe('components consume the theme', () => {
  test('the badge renders its Figma size, radius and border from the tokens', async ({ page }) => {
    await page.goto('http://localhost:3000/badge');

    // Figma badge lg: 28px box, border/radius/full, border/width/default, Regular/text-base.
    const badge = page.locator('[data-node-id="2321:8842"]').first();

    await expect(badge).toHaveCSS('border-top-width', expected.semanticBorders['border-width-default']);
    await expect(badge).toHaveCSS('border-top-left-radius', expected.semanticBorders['radius-full']);
    await expect(badge).toHaveCSS('height', expected.spacing['7']);
  });

  test('the alert renders its Figma padding, gap and type from the tokens', async ({ page }) => {
    await page.goto('http://localhost:3000/alert');

    // Figma alert `1515:6124` is the sm variant: spacing-3 padding, spacing-2-5 row gap,
    // border/radius/default, and Medium/text-sm for the message row.
    const alert = page.locator('[data-node-id="1515:6124"]').first();

    await expect(alert).toHaveCSS('padding-top', expected.spacing['3']);
    await expect(alert).toHaveCSS('row-gap', expected.spacing['2.5']);
    await expect(alert).toHaveCSS('border-top-left-radius', expected.semanticBorders['radius-default']);
    await expect(alert.locator('p').first()).toHaveCSS('font-size', expected.typeScale.sm.fontSize);
    await expect(alert.locator('p').first()).toHaveCSS('line-height', expected.typeScale.sm.lineHeight);
  });
});
