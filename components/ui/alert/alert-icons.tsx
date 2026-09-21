import type { AlertSize, AlertStatus } from './alert';

/**
 * Font Awesome 7 Free Solid glyphs, inlined as SVG.
 *
 * Figma draws these as text nodes in the "Font Awesome 7 Free: Solid" family
 * (component `989:15537`), so `download_assets` returns no vector layer for them.
 * The paths below are the Font Awesome Free 7.3.1 `solid` set, matching the glyph
 * names Figma reports per status. Same approach as `components/ui/badge/plus-icon.tsx`.
 */
type Glyph = { viewBox: string; path: string; name: string };

const glyphs = {
  'heart-circle-plus': {
    name: 'heart-circle-plus',
    viewBox: '0 0 576 512',
    path: 'M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 17.6-3.4 35.6-9.5 53.7-21.8-8.6-45.6-13.4-70.5-13.4-106 0-192 86-192 192 0 28.5 6.2 55.6 17.4 80-.5 0-.9 0-1.4 0-15.5 0-30.8-4.6-43.1-14.1-73-55.7-212.9-186-212.9-298.2l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1zM432 256a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 48-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0 0-48z',
  },
  'circle-info': {
    name: 'info-circle',
    viewBox: '0 0 512 512',
    path: 'M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z',
  },
  'circle-check': {
    name: 'circle-check',
    viewBox: '0 0 512 512',
    path: 'M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z',
  },
  'triangle-exclamation': {
    name: 'triangle-exclamation',
    viewBox: '0 0 512 512',
    path: 'M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z',
  },
  'circle-exclamation': {
    name: 'circle-exclamation',
    viewBox: '0 0 512 512',
    path: 'M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z',
  },
  xmark: {
    name: 'xmark',
    viewBox: '0 0 384 512',
    path: 'M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z',
  },
} satisfies Record<string, Glyph>;

/** Figma picks the prefix glyph from the `Status` property. */
const statusGlyph: Record<AlertStatus, keyof typeof glyphs> = {
  default: 'heart-circle-plus',
  info: 'circle-info',
  success: 'circle-check',
  warning: 'triangle-exclamation',
  danger: 'circle-exclamation',
};

/**
 * Glyph height is the size's font-size token, so a change to the type scale reaches the
 * icons too; the width follows the viewBox aspect, which is how Font Awesome renders its
 * SVG icons.
 */
const glyphHeight: Record<AlertSize, string> = {
  sm: 'h-[var(--font-size-sm)]',
  md: 'h-[var(--font-size-base)]',
  lg: 'h-[var(--font-size-lg)]',
};

function Icon({ glyph, size }: { glyph: Glyph; size: AlertSize }) {
  return (
    <svg
      aria-hidden="true"
      className={`w-auto shrink-0 ${glyphHeight[size]}`}
      fill="currentColor"
      viewBox={glyph.viewBox}
    >
      <path d={glyph.path} />
    </svg>
  );
}

/** Prefix icon for a status, as Figma maps them. */
export function AlertStatusIcon({ size, status }: { size: AlertSize; status: AlertStatus }) {
  return <Icon glyph={glyphs[statusGlyph[status]]} size={size} />;
}

/** The trailing dismiss glyph, `xmark` in every variant. */
export function AlertDismissIcon({ size }: { size: AlertSize }) {
  return <Icon glyph={glyphs.xmark} size={size} />;
}

export { statusGlyph };
