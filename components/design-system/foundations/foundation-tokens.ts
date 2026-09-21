/**
 * Plus UI foundations - typography, spacing and border token structure.
 *
 * Extracted from Figma file `vR3AuW3jxvnMMMMLDQvYJ6`: "Typography" (`4909:62199` /
 * `4909:61939`), "Spacing" (`4907:9053` / `4907:8772`) and "Borders" (`4908:8172` /
 * `4908:7980`). Snapshot: `artifacts/figma/typography-spacing-borders.json`.
 *
 * As with `color-system/color-tokens.ts`, this module carries the *shape* of the systems -
 * token names, the Figma variables they come from, and which layer aliases which. The values
 * themselves live only in `app/globals.css`, so anything rendering from this module reads the
 * real theme rather than a second copy of the design file.
 *
 * Derived from the snapshot and checked back against it by `foundation-tokens.test.ts`.
 */

/** CSS value that resolves a theme token through the cascade. */
export function tokenVar(name: string): string {
  return `var(--${name})`;
}

/* ------------------------------------------------------------------ */
/* Layer 1 - the global number scale (Figma `number/*`)                */
/* ------------------------------------------------------------------ */

export type NumberStep = {
  /** Theme token name without the leading `--`, e.g. `number-0-5`. */
  token: string;
  /** Figma global token, e.g. `number/0-5`. */
  figmaToken: string;
  px: number;
};

/**
 * Spacing, border radius and border width all resolve through this one scale, which is what
 * keeps a 4px gap and a 4px radius the same value rather than two coincidences.
 */
export const numberScale: NumberStep[] = [
  { token: 'number-0', figmaToken: 'number/0', px: 0 },
  { token: 'number-px', figmaToken: 'number/px', px: 1 },
  { token: 'number-0-5', figmaToken: 'number/0-5', px: 2 },
  { token: 'number-1', figmaToken: 'number/1', px: 4 },
  { token: 'number-1-5', figmaToken: 'number/1-5', px: 6 },
  { token: 'number-2', figmaToken: 'number/2', px: 8 },
  { token: 'number-2-5', figmaToken: 'number/2-5', px: 10 },
  { token: 'number-3', figmaToken: 'number/3', px: 12 },
  { token: 'number-3-5', figmaToken: 'number/3-5', px: 14 },
  { token: 'number-4', figmaToken: 'number/4', px: 16 },
  { token: 'number-5', figmaToken: 'number/5', px: 20 },
  { token: 'number-6', figmaToken: 'number/6', px: 24 },
  { token: 'number-7', figmaToken: 'number/7', px: 28 },
  { token: 'number-8', figmaToken: 'number/8', px: 32 },
  { token: 'number-9', figmaToken: 'number/9', px: 36 },
  { token: 'number-10', figmaToken: 'number/10', px: 40 },
  { token: 'number-11', figmaToken: 'number/11', px: 44 },
  { token: 'number-12', figmaToken: 'number/12', px: 48 },
  { token: 'number-14', figmaToken: 'number/14', px: 56 },
  { token: 'number-16', figmaToken: 'number/16', px: 64 },
  { token: 'number-20', figmaToken: 'number/20', px: 80 },
  { token: 'number-24', figmaToken: 'number/24', px: 96 },
  { token: 'number-28', figmaToken: 'number/28', px: 112 },
  { token: 'number-32', figmaToken: 'number/32', px: 128 },
  { token: 'number-36', figmaToken: 'number/36', px: 144 },
  { token: 'number-40', figmaToken: 'number/40', px: 160 },
  { token: 'number-44', figmaToken: 'number/44', px: 176 },
  { token: 'number-48', figmaToken: 'number/48', px: 192 },
  { token: 'number-52', figmaToken: 'number/52', px: 208 },
  { token: 'number-56', figmaToken: 'number/56', px: 224 },
  { token: 'number-60', figmaToken: 'number/60', px: 240 },
  { token: 'number-64', figmaToken: 'number/64', px: 256 },
  { token: 'number-72', figmaToken: 'number/72', px: 288 },
  { token: 'number-80', figmaToken: 'number/80', px: 320 },
  { token: 'number-96', figmaToken: 'number/96', px: 384 },
];

/* ------------------------------------------------------------------ */
/* Typography (Figma "Typography", 4909:62199 / 4909:61939)            */
/* ------------------------------------------------------------------ */

export const fontFamily = {
  token: 'font-default',
  figmaVariable: 'typography/font-family/default',
  /** The face Figma names. Not interchangeable with a lookalike. */
  value: 'Inter',
  /** Loaded by `next/font` in `app/layout.tsx`, exposed as `--font-inter`. */
  cssVariable: 'font-inter',
  url: 'https://rsms.me/inter/',
} as const;

export const letterSpacing = {
  token: 'tracking-default',
  /** Every Figma text style declares `letterSpacing: 0`. */
  value: '0em',
} as const;

export type FontWeightName = 'regular' | 'medium' | 'semi-bold' | 'bold';

export type FontWeightToken = {
  name: FontWeightName;
  /** How the Figma "Font Weight" column writes it. */
  label: string;
  token: string;
  figmaVariable: string;
  value: number;
};

export const fontWeights: FontWeightToken[] = [
  { name: 'regular', label: 'Regular', token: 'font-weight-regular', figmaVariable: 'font-weight/regular', value: 400 },
  { name: 'medium', label: 'Medium', token: 'font-weight-medium', figmaVariable: 'font-weight/medium', value: 500 },
  { name: 'semi-bold', label: 'Semi Bold', token: 'font-weight-semi-bold', figmaVariable: 'font-weight/semi-bold', value: 600 },
  { name: 'bold', label: 'Bold', token: 'font-weight-bold', figmaVariable: 'font-weight/bold', value: 700 },
];

export type TypeSizeName = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

export type TypeSizeToken = {
  /** Step name as the Figma "Text Styles Name" column writes it, without the `text-` prefix. */
  name: TypeSizeName;
  /** Tailwind text token: `text-<name>`, carrying the paired line height and letter spacing. */
  token: string;
  /** Layer 1 tokens the style token aliases. */
  fontSizeToken: string;
  lineHeightToken: string;
  paragraphSpacingToken: string;
  /** Figma global variables. The base step is called `md` there and `base` in the style name. */
  figmaFontSizeVariable: string;
  figmaLineHeightVariable: string;
  fontSizePx: number;
  lineHeightPx: number;
  paragraphSpacingPx: number;
  /** Figma node id of the table row documenting this step. */
  figmaNodeId: string;
};

/** Layer 1 + 2 - the 13 steps of the Figma type scale (`4909:62513`). */
export const typeScale: TypeSizeToken[] = [
  {
    name: 'xs',
    token: 'text-xs',
    fontSizeToken: 'font-size-xs',
    lineHeightToken: 'line-height-xs',
    paragraphSpacingToken: 'paragraph-spacing-xs',
    figmaFontSizeVariable: 'font-size/xs',
    figmaLineHeightVariable: 'line-height/xs',
    fontSizePx: 12,
    lineHeightPx: 16,
    paragraphSpacingPx: 12,
    figmaNodeId: '4909:62531',
  },
  {
    name: 'sm',
    token: 'text-sm',
    fontSizeToken: 'font-size-sm',
    lineHeightToken: 'line-height-sm',
    paragraphSpacingToken: 'paragraph-spacing-sm',
    figmaFontSizeVariable: 'font-size/sm',
    figmaLineHeightVariable: 'line-height/sm',
    fontSizePx: 14,
    lineHeightPx: 20,
    paragraphSpacingPx: 14,
    figmaNodeId: '4909:62566',
  },
  {
    name: 'base',
    token: 'text-base',
    fontSizeToken: 'font-size-base',
    lineHeightToken: 'line-height-base',
    paragraphSpacingToken: 'paragraph-spacing-base',
    figmaFontSizeVariable: 'font-size/md',
    figmaLineHeightVariable: 'line-height/md',
    fontSizePx: 16,
    lineHeightPx: 24,
    paragraphSpacingPx: 16,
    figmaNodeId: '4909:62601',
  },
  {
    name: 'lg',
    token: 'text-lg',
    fontSizeToken: 'font-size-lg',
    lineHeightToken: 'line-height-lg',
    paragraphSpacingToken: 'paragraph-spacing-lg',
    figmaFontSizeVariable: 'font-size/lg',
    figmaLineHeightVariable: 'line-height/lg',
    fontSizePx: 18,
    lineHeightPx: 28,
    paragraphSpacingPx: 18,
    figmaNodeId: '4909:62636',
  },
  {
    name: 'xl',
    token: 'text-xl',
    fontSizeToken: 'font-size-xl',
    lineHeightToken: 'line-height-xl',
    paragraphSpacingToken: 'paragraph-spacing-xl',
    figmaFontSizeVariable: 'font-size/xl',
    figmaLineHeightVariable: 'line-height/xl',
    fontSizePx: 20,
    lineHeightPx: 28,
    paragraphSpacingPx: 20,
    figmaNodeId: '4909:62671',
  },
  {
    name: '2xl',
    token: 'text-2xl',
    fontSizeToken: 'font-size-2xl',
    lineHeightToken: 'line-height-2xl',
    paragraphSpacingToken: 'paragraph-spacing-2xl',
    figmaFontSizeVariable: 'font-size/2xl',
    figmaLineHeightVariable: 'line-height/2xl',
    fontSizePx: 24,
    lineHeightPx: 32,
    paragraphSpacingPx: 24,
    figmaNodeId: '4909:62706',
  },
  {
    name: '3xl',
    token: 'text-3xl',
    fontSizeToken: 'font-size-3xl',
    lineHeightToken: 'line-height-3xl',
    paragraphSpacingToken: 'paragraph-spacing-3xl',
    figmaFontSizeVariable: 'font-size/3xl',
    figmaLineHeightVariable: 'line-height/3xl',
    fontSizePx: 30,
    lineHeightPx: 36,
    paragraphSpacingPx: 30,
    figmaNodeId: '4909:62741',
  },
  {
    name: '4xl',
    token: 'text-4xl',
    fontSizeToken: 'font-size-4xl',
    lineHeightToken: 'line-height-4xl',
    paragraphSpacingToken: 'paragraph-spacing-4xl',
    figmaFontSizeVariable: 'font-size/4xl',
    figmaLineHeightVariable: 'line-height/4xl',
    fontSizePx: 36,
    lineHeightPx: 40,
    paragraphSpacingPx: 36,
    figmaNodeId: '4909:62776',
  },
  {
    name: '5xl',
    token: 'text-5xl',
    fontSizeToken: 'font-size-5xl',
    lineHeightToken: 'line-height-5xl',
    paragraphSpacingToken: 'paragraph-spacing-5xl',
    figmaFontSizeVariable: 'font-size/5xl',
    figmaLineHeightVariable: 'line-height/5xl',
    fontSizePx: 48,
    lineHeightPx: 48,
    paragraphSpacingPx: 48,
    figmaNodeId: '4909:62811',
  },
  {
    name: '6xl',
    token: 'text-6xl',
    fontSizeToken: 'font-size-6xl',
    lineHeightToken: 'line-height-6xl',
    paragraphSpacingToken: 'paragraph-spacing-6xl',
    figmaFontSizeVariable: 'font-size/6xl',
    figmaLineHeightVariable: 'line-height/6xl',
    fontSizePx: 60,
    lineHeightPx: 60,
    paragraphSpacingPx: 60,
    figmaNodeId: '4909:62846',
  },
  {
    name: '7xl',
    token: 'text-7xl',
    fontSizeToken: 'font-size-7xl',
    lineHeightToken: 'line-height-7xl',
    paragraphSpacingToken: 'paragraph-spacing-7xl',
    figmaFontSizeVariable: 'font-size/7xl',
    figmaLineHeightVariable: 'line-height/7xl',
    fontSizePx: 72,
    lineHeightPx: 72,
    paragraphSpacingPx: 72,
    figmaNodeId: '4909:62881',
  },
  {
    name: '8xl',
    token: 'text-8xl',
    fontSizeToken: 'font-size-8xl',
    lineHeightToken: 'line-height-8xl',
    paragraphSpacingToken: 'paragraph-spacing-8xl',
    figmaFontSizeVariable: 'font-size/8xl',
    figmaLineHeightVariable: 'line-height/8xl',
    fontSizePx: 96,
    lineHeightPx: 96,
    paragraphSpacingPx: 96,
    figmaNodeId: '4909:62916',
  },
  {
    name: '9xl',
    token: 'text-9xl',
    fontSizeToken: 'font-size-9xl',
    lineHeightToken: 'line-height-9xl',
    paragraphSpacingToken: 'paragraph-spacing-9xl',
    figmaFontSizeVariable: 'font-size/9xl',
    figmaLineHeightVariable: 'line-height/9xl',
    fontSizePx: 128,
    lineHeightPx: 128,
    paragraphSpacingPx: 128,
    figmaNodeId: '4909:62951',
  },
];

export type TextStyle = {
  /** Figma local style name, e.g. `Semi Bold/text-3xl`. */
  name: string;
  weight: FontWeightName;
  size: TypeSizeName;
  /** The utilities that reproduce the style. */
  classNames: string;
};

/**
 * Layer 3 - the 52 Figma text styles, one per weight x size.
 *
 * A Figma text style is a composite of four values (family, size, line height, weight) and
 * Tailwind has no single token for that shape, so each style is expressed as the composition
 * of the tokens it is built from. Nothing here restates a Figma measurement: the numbers stay
 * in the size and weight tokens above.
 */
export const textStyles: TextStyle[] = fontWeights.flatMap((weight) =>
  typeScale.map((size) => ({
    name: `${weight.label}/text-${size.name}`,
    weight: weight.name,
    size: size.name,
    classNames: `font-default text-${size.name} font-${weight.name}`,
  })),
);

/* ------------------------------------------------------------------ */
/* Spacing (Figma "Spacing", 4907:9053 / 4907:8772)                    */
/* ------------------------------------------------------------------ */

export type SpacingToken = {
  /** Theme token name, e.g. `spacing-0.5` - the form Tailwind's `p-0.5` looks up. */
  token: string;
  /** Alias token name as the Figma table writes it, e.g. `spacing-0-5`. */
  figmaAlias: string;
  /** Suffix the Tailwind utilities take, e.g. `0.5` in `p-0.5`. */
  step: string;
  /** Global token this alias resolves to. */
  numberToken: string;
  figmaGlobalToken: string;
  px: number;
  figmaNodeId: string;
};

/** Layer 2 - the 35 steps of the Figma spacing scale (`4907:9279`). */
export const spacingScale: SpacingToken[] = [
  { token: 'spacing-0', figmaAlias: 'spacing-0', step: '0', numberToken: 'number-0', figmaGlobalToken: 'number/0', px: 0, figmaNodeId: '4907:9292' },
  { token: 'spacing-px', figmaAlias: 'spacing-px', step: 'px', numberToken: 'number-px', figmaGlobalToken: 'number/px', px: 1, figmaNodeId: '4907:9308' },
  { token: 'spacing-0.5', figmaAlias: 'spacing-0-5', step: '0.5', numberToken: 'number-0-5', figmaGlobalToken: 'number/0-5', px: 2, figmaNodeId: '4907:9324' },
  { token: 'spacing-1', figmaAlias: 'spacing-1', step: '1', numberToken: 'number-1', figmaGlobalToken: 'number/1', px: 4, figmaNodeId: '4907:9344' },
  { token: 'spacing-1.5', figmaAlias: 'spacing-1-5', step: '1.5', numberToken: 'number-1-5', figmaGlobalToken: 'number/1-5', px: 6, figmaNodeId: '4907:9364' },
  { token: 'spacing-2', figmaAlias: 'spacing-2', step: '2', numberToken: 'number-2', figmaGlobalToken: 'number/2', px: 8, figmaNodeId: '4907:9384' },
  { token: 'spacing-2.5', figmaAlias: 'spacing-2-5', step: '2.5', numberToken: 'number-2-5', figmaGlobalToken: 'number/2-5', px: 10, figmaNodeId: '4907:9404' },
  { token: 'spacing-3', figmaAlias: 'spacing-3', step: '3', numberToken: 'number-3', figmaGlobalToken: 'number/3', px: 12, figmaNodeId: '4907:9424' },
  { token: 'spacing-3.5', figmaAlias: 'spacing-3-5', step: '3.5', numberToken: 'number-3-5', figmaGlobalToken: 'number/3-5', px: 14, figmaNodeId: '4907:9444' },
  { token: 'spacing-4', figmaAlias: 'spacing-4', step: '4', numberToken: 'number-4', figmaGlobalToken: 'number/4', px: 16, figmaNodeId: '4907:9464' },
  { token: 'spacing-5', figmaAlias: 'spacing-5', step: '5', numberToken: 'number-5', figmaGlobalToken: 'number/5', px: 20, figmaNodeId: '4907:9484' },
  { token: 'spacing-6', figmaAlias: 'spacing-6', step: '6', numberToken: 'number-6', figmaGlobalToken: 'number/6', px: 24, figmaNodeId: '4907:9504' },
  { token: 'spacing-7', figmaAlias: 'spacing-7', step: '7', numberToken: 'number-7', figmaGlobalToken: 'number/7', px: 28, figmaNodeId: '4907:9524' },
  { token: 'spacing-8', figmaAlias: 'spacing-8', step: '8', numberToken: 'number-8', figmaGlobalToken: 'number/8', px: 32, figmaNodeId: '4907:9544' },
  { token: 'spacing-9', figmaAlias: 'spacing-9', step: '9', numberToken: 'number-9', figmaGlobalToken: 'number/9', px: 36, figmaNodeId: '4907:9564' },
  { token: 'spacing-10', figmaAlias: 'spacing-10', step: '10', numberToken: 'number-10', figmaGlobalToken: 'number/10', px: 40, figmaNodeId: '4907:9584' },
  { token: 'spacing-11', figmaAlias: 'spacing-11', step: '11', numberToken: 'number-11', figmaGlobalToken: 'number/11', px: 44, figmaNodeId: '4907:9604' },
  { token: 'spacing-12', figmaAlias: 'spacing-12', step: '12', numberToken: 'number-12', figmaGlobalToken: 'number/12', px: 48, figmaNodeId: '4907:9624' },
  { token: 'spacing-14', figmaAlias: 'spacing-14', step: '14', numberToken: 'number-14', figmaGlobalToken: 'number/14', px: 56, figmaNodeId: '4907:9644' },
  { token: 'spacing-16', figmaAlias: 'spacing-16', step: '16', numberToken: 'number-16', figmaGlobalToken: 'number/16', px: 64, figmaNodeId: '4907:9664' },
  { token: 'spacing-20', figmaAlias: 'spacing-20', step: '20', numberToken: 'number-20', figmaGlobalToken: 'number/20', px: 80, figmaNodeId: '4907:9684' },
  { token: 'spacing-24', figmaAlias: 'spacing-24', step: '24', numberToken: 'number-24', figmaGlobalToken: 'number/24', px: 96, figmaNodeId: '4907:9704' },
  { token: 'spacing-28', figmaAlias: 'spacing-28', step: '28', numberToken: 'number-28', figmaGlobalToken: 'number/28', px: 112, figmaNodeId: '4907:9724' },
  { token: 'spacing-32', figmaAlias: 'spacing-32', step: '32', numberToken: 'number-32', figmaGlobalToken: 'number/32', px: 128, figmaNodeId: '4907:9744' },
  { token: 'spacing-36', figmaAlias: 'spacing-36', step: '36', numberToken: 'number-36', figmaGlobalToken: 'number/36', px: 144, figmaNodeId: '4907:9764' },
  { token: 'spacing-40', figmaAlias: 'spacing-40', step: '40', numberToken: 'number-40', figmaGlobalToken: 'number/40', px: 160, figmaNodeId: '4907:9784' },
  { token: 'spacing-44', figmaAlias: 'spacing-44', step: '44', numberToken: 'number-44', figmaGlobalToken: 'number/44', px: 176, figmaNodeId: '4907:9804' },
  { token: 'spacing-48', figmaAlias: 'spacing-48', step: '48', numberToken: 'number-48', figmaGlobalToken: 'number/48', px: 192, figmaNodeId: '4907:9824' },
  { token: 'spacing-52', figmaAlias: 'spacing-52', step: '52', numberToken: 'number-52', figmaGlobalToken: 'number/52', px: 208, figmaNodeId: '4907:9844' },
  { token: 'spacing-56', figmaAlias: 'spacing-56', step: '56', numberToken: 'number-56', figmaGlobalToken: 'number/56', px: 224, figmaNodeId: '4907:9864' },
  { token: 'spacing-60', figmaAlias: 'spacing-60', step: '60', numberToken: 'number-60', figmaGlobalToken: 'number/60', px: 240, figmaNodeId: '4907:9884' },
  { token: 'spacing-64', figmaAlias: 'spacing-64', step: '64', numberToken: 'number-64', figmaGlobalToken: 'number/64', px: 256, figmaNodeId: '4907:9904' },
  { token: 'spacing-72', figmaAlias: 'spacing-72', step: '72', numberToken: 'number-72', figmaGlobalToken: 'number/72', px: 288, figmaNodeId: '4907:9924' },
  { token: 'spacing-80', figmaAlias: 'spacing-80', step: '80', numberToken: 'number-80', figmaGlobalToken: 'number/80', px: 320, figmaNodeId: '4907:9944' },
  { token: 'spacing-96', figmaAlias: 'spacing-96', step: '96', numberToken: 'number-96', figmaGlobalToken: 'number/96', px: 384, figmaNodeId: '4907:9964' },
];

/* ------------------------------------------------------------------ */
/* Borders (Figma "Borders", 4908:8172 / 4908:7980)                    */
/* ------------------------------------------------------------------ */

export type BorderToken = {
  /** Theme token name without the leading `--`. */
  token: string;
  /** The utility that consumes it. */
  utility: string;
  /** Alias token name as the Figma table writes it. */
  figmaAlias: string;
  /** Global token this alias resolves to, or `null` where the table prints "-". */
  numberToken: string | null;
  figmaGlobalToken: string | null;
  px: number;
  figmaNodeId: string;
};

/** Layer 2 - the 9 steps of the Figma border radius table (`4908:8597`). */
export const borderRadiusScale: BorderToken[] = [
  { token: 'radius-none', utility: 'rounded-none', figmaAlias: 'rounded-none', numberToken: 'number-0', figmaGlobalToken: 'number/0', px: 0, figmaNodeId: '4908:8610' },
  { token: 'radius-sm', utility: 'rounded-sm', figmaAlias: 'rounded-sm', numberToken: 'number-0-5', figmaGlobalToken: 'number/0-5', px: 2, figmaNodeId: '4908:8626' },
  { token: 'radius-base', utility: 'rounded-base', figmaAlias: 'rounded', numberToken: 'number-1', figmaGlobalToken: 'number/1', px: 4, figmaNodeId: '4908:8642' },
  { token: 'radius-md', utility: 'rounded-md', figmaAlias: 'rounded-md', numberToken: 'number-1-5', figmaGlobalToken: 'number/1-5', px: 6, figmaNodeId: '4908:8658' },
  { token: 'radius-lg', utility: 'rounded-lg', figmaAlias: 'rounded-lg', numberToken: 'number-2', figmaGlobalToken: 'number/2', px: 8, figmaNodeId: '4908:8674' },
  { token: 'radius-xl', utility: 'rounded-xl', figmaAlias: 'rounded-xl', numberToken: 'number-3', figmaGlobalToken: 'number/3', px: 12, figmaNodeId: '4908:8690' },
  { token: 'radius-2xl', utility: 'rounded-2xl', figmaAlias: 'rounded-2xl', numberToken: 'number-4', figmaGlobalToken: 'number/4', px: 16, figmaNodeId: '4908:8706' },
  { token: 'radius-3xl', utility: 'rounded-3xl', figmaAlias: 'rounded-3xl', numberToken: 'number-6', figmaGlobalToken: 'number/6', px: 24, figmaNodeId: '4908:8722' },
  { token: 'radius-full', utility: 'rounded-full', figmaAlias: 'rounded-full', numberToken: null, figmaGlobalToken: null, px: 9999, figmaNodeId: '4908:8738' },
];

/**
 * Layer 2 - the 5 steps of the Figma border width table (`4908:8790`).
 *
 * Figma writes the global token for `border-2` as `number/0-51`, which is not a step of the
 * number scale; `number/0-5` is the 2px step and is what the token resolves to here. The
 * Figma spelling is kept in `figmaGlobalToken` rather than silently corrected.
 */
export const borderWidthScale: BorderToken[] = [
  { token: 'border-width-0', utility: 'border-w-0', figmaAlias: 'border-0', numberToken: 'number-0', figmaGlobalToken: 'number/0', px: 0, figmaNodeId: '4908:8803' },
  { token: 'border-width-1', utility: 'border-w-1', figmaAlias: 'border', numberToken: 'number-px', figmaGlobalToken: 'number/px', px: 1, figmaNodeId: '4908:8819' },
  { token: 'border-width-2', utility: 'border-w-2', figmaAlias: 'border-2', numberToken: 'number-0-5', figmaGlobalToken: 'number/0-51', px: 2, figmaNodeId: '4908:8835' },
  { token: 'border-width-4', utility: 'border-w-4', figmaAlias: 'border-4', numberToken: 'number-1', figmaGlobalToken: 'number/1', px: 4, figmaNodeId: '4908:8851' },
  { token: 'border-width-8', utility: 'border-w-8', figmaAlias: 'border-8', numberToken: 'number-2', figmaGlobalToken: 'number/2', px: 8, figmaNodeId: '4908:8867' },
];

export type SemanticBorderToken = {
  token: string;
  utility: string;
  figmaVariable: string;
  /** Layer 2 token this semantic name aliases. */
  aliasOf: string;
  kind: 'radius' | 'width';
  px: number;
};

/** Layer 3 - the border roles Figma names, and which alias token each resolves to. */
export const semanticBorderTokens: SemanticBorderToken[] = [
  {
    token: 'radius-default',
    utility: 'rounded-default',
    figmaVariable: 'border/radius/default',
    aliasOf: 'radius-base',
    kind: 'radius',
    px: 4,
  },
  {
    token: 'radius-full',
    utility: 'rounded-full',
    figmaVariable: 'border/radius/full',
    aliasOf: 'radius-full',
    kind: 'radius',
    px: 9999,
  },
  {
    token: 'border-width-default',
    utility: 'border-w-default',
    figmaVariable: 'border/width/default',
    aliasOf: 'border-width-1',
    kind: 'width',
    px: 1,
  },
];

/* ------------------------------------------------------------------ */
/* Utility class literals                                              */
/* ------------------------------------------------------------------ */

/**
 * The Tailwind utility that consumes each token, written out in full.
 *
 * Tailwind scans source text, so a class assembled at runtime - `text-${size.name}` - is
 * never generated. Spelling every utility here is what lets the design-system pages render
 * the real utilities, which is also what makes them a check that each utility resolves to the
 * token it should.
 */
export const typeSizeUtility: Record<TypeSizeName, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

export const fontWeightUtility: Record<FontWeightName, string> = {
  'regular': 'font-regular',
  'medium': 'font-medium',
  'semi-bold': 'font-semi-bold',
  'bold': 'font-bold',
};

/** `w-*` renders the step as a width; `p-*` and `gap-*` read the same token. */
export const spacingWidthUtility: Record<string, string> = {
  '0': 'w-0',
  'px': 'w-px',
  '0.5': 'w-0.5',
  '1': 'w-1',
  '1.5': 'w-1.5',
  '2': 'w-2',
  '2.5': 'w-2.5',
  '3': 'w-3',
  '3.5': 'w-3.5',
  '4': 'w-4',
  '5': 'w-5',
  '6': 'w-6',
  '7': 'w-7',
  '8': 'w-8',
  '9': 'w-9',
  '10': 'w-10',
  '11': 'w-11',
  '12': 'w-12',
  '14': 'w-14',
  '16': 'w-16',
  '20': 'w-20',
  '24': 'w-24',
  '28': 'w-28',
  '32': 'w-32',
  '36': 'w-36',
  '40': 'w-40',
  '44': 'w-44',
  '48': 'w-48',
  '52': 'w-52',
  '56': 'w-56',
  '60': 'w-60',
  '64': 'w-64',
  '72': 'w-72',
  '80': 'w-80',
  '96': 'w-96',
};

export const borderRadiusUtility: Record<string, string> = {
  'none': 'rounded-none',
  'sm': 'rounded-sm',
  'base': 'rounded-base',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  'full': 'rounded-full',
  default: 'rounded-default',
};

export const borderWidthUtility: Record<string, string> = {
  '0': 'border-w-0',
  '1': 'border-w-1',
  '2': 'border-w-2',
  '4': 'border-w-4',
  '8': 'border-w-8',
  default: 'border-w-default',
};

/** Copy taken from the Figma documentation frames, used by the Storybook pages. */
export const foundationsCopy = {
  typographyTitle: 'Typography',
  typographyDescription:
    "Plus UI's design system present a meticulous approach to text styling through our Text Style Tokens. Our Font Size and Line Height tokens allow you to finely craft the appearance of text elements in your user interface.",
  fontFamilyTitle: 'Font Family',
  fontFamilyDescription:
    'Plus UI uses Inter as the default typeface. It is an free, open-source sans-serif typeface designed by Swedish designer/programmer Rasmus Andersson. It was designed to work well on screens as a UI font and features a large x-height.',
  fontSizeTitle: 'Font Size & Line Height',
  fontSizeDescription:
    'Tailor the size and spacing of text elements to create a harmonious and polished typographic hierarchy.',
  fontWeightTitle: 'Font Weight',
  fontWeightDescription:
    'Choose from a variety of weights to convey emphasis and establish a clear hierarchy within your design which leads the flexibility and customization available for creating compelling typography in your application.',
  spacingTitle: 'Spacing',
  spacingDescription:
    'The spacing scale is a single set of steps shared by padding, margins and gaps, so every distance in the interface lands on the same grid.',
  borderRadiusTitle: 'Border Radius',
  borderRadiusDescription: 'Add a touch of sophistication to your components with Plus UI\'s Border Radius options. Customize the curvature of corners to create a modern and sleek aesthetic, ensuring a harmonious look and feel across your application.',
  borderWidthTitle: 'Border Width',
  borderWidthDescription: 'Fine-tune the visual weight of your design elements with Plus UI\'s Border Width options. Tailor the thickness of borders to achieve the desired emphasis and separation, contributing to a polished and well-defined user interface.',
} as const;

/** Figma nodes the foundation pages are read from. */
export const foundationsFigmaNodes = {
  typographyDocumentation: '4909:62199',
  typographyTokens: '4909:61939',
  typographyTokenTable: '4909:62513',
  spacingDocumentation: '4907:9053',
  spacingTokens: '4907:8772',
  spacingTokenTable: '4907:9279',
  bordersDocumentation: '4908:8172',
  bordersTokens: '4908:7980',
  borderRadiusTable: '4908:8597',
  borderWidthTable: '4908:8790',
} as const;
