import { test, expect } from '@playwright/test';
import { alertInvertsFor, figmaNodeIds } from '@/components/ui/alert';
import type { AlertKind, AlertSize, AlertStatus } from '@/components/ui/alert';

/**
 * Expected values below come from the Figma MCP snapshot for component set
 * `1515:6165` (Plus UI), stored in `artifacts/figma/alert.json`, not from the
 * implementation.
 */
const kinds: AlertKind[] = ['filled', 'outlined', 'dashed'];
const statuses: AlertStatus[] = ['default', 'info', 'success', 'warning', 'danger'];
const sizes: AlertSize[] = ['sm', 'md', 'lg'];

// Sizes sm / md* / lg: space-3 / space-3-5 / space-4 padding, and the two type ramps.
const metrics = {
  sm: { padding: 12, gap: 10, contentGap: 8, message: [14, 20], description: [12, 16], height: 84 },
  md: { padding: 14, gap: 12, contentGap: 10, message: [16, 24], description: [14, 20], height: 102 },
  lg: { padding: 16, gap: 14, contentGap: 12, message: [18, 28], description: [16, 24], height: 144 },
} as const;

const TRANSPARENT = 'rgba(0, 0, 0, 0)';
const TEXT_DEFAULT = 'rgb(3, 7, 18)';
const TEXT_BASE = 'rgb(255, 255, 255)';

type Palette = { surface: string; message: string; description: string; icon: string; dismiss: string };

// color/background/<status>/... with the prefix icon on the opposite ramp.
const filled: Record<'false' | 'true', Record<AlertStatus, Palette>> = {
  false: {
    default: { surface: 'rgb(243, 244, 246)', message: TEXT_DEFAULT, description: TEXT_DEFAULT, icon: TEXT_DEFAULT, dismiss: TEXT_DEFAULT },
    info: { surface: 'rgb(29, 78, 216)', message: TEXT_BASE, description: TEXT_BASE, icon: 'rgb(219, 234, 254)', dismiss: TEXT_BASE },
    success: { surface: 'rgb(21, 128, 61)', message: TEXT_BASE, description: TEXT_BASE, icon: 'rgb(220, 252, 231)', dismiss: TEXT_BASE },
    warning: { surface: 'rgb(161, 98, 7)', message: TEXT_BASE, description: TEXT_BASE, icon: 'rgb(254, 249, 195)', dismiss: TEXT_BASE },
    danger: { surface: 'rgb(185, 28, 28)', message: TEXT_BASE, description: TEXT_BASE, icon: 'rgb(254, 226, 226)', dismiss: TEXT_BASE },
  },
  true: {
    default: { surface: 'rgb(55, 65, 81)', message: TEXT_BASE, description: TEXT_BASE, icon: TEXT_BASE, dismiss: TEXT_BASE },
    info: { surface: 'rgb(219, 234, 254)', message: TEXT_DEFAULT, description: TEXT_DEFAULT, icon: 'rgb(29, 78, 216)', dismiss: TEXT_DEFAULT },
    success: { surface: 'rgb(220, 252, 231)', message: TEXT_DEFAULT, description: TEXT_DEFAULT, icon: 'rgb(21, 128, 61)', dismiss: TEXT_DEFAULT },
    warning: { surface: 'rgb(254, 249, 195)', message: TEXT_DEFAULT, description: TEXT_DEFAULT, icon: 'rgb(161, 98, 7)', dismiss: TEXT_DEFAULT },
    danger: { surface: 'rgb(254, 226, 226)', message: TEXT_DEFAULT, description: TEXT_DEFAULT, icon: 'rgb(185, 28, 28)', dismiss: TEXT_DEFAULT },
  },
};

// color/border/<status>; only the message and the icon take the status colour.
const bordered: Record<AlertStatus, Palette> = {
  default: { surface: 'rgb(156, 163, 175)', message: TEXT_DEFAULT, description: TEXT_DEFAULT, icon: TEXT_DEFAULT, dismiss: TEXT_DEFAULT },
  info: { surface: 'rgb(29, 78, 216)', message: 'rgb(29, 78, 216)', description: TEXT_DEFAULT, icon: 'rgb(29, 78, 216)', dismiss: TEXT_DEFAULT },
  success: { surface: 'rgb(21, 128, 61)', message: 'rgb(21, 128, 61)', description: TEXT_DEFAULT, icon: 'rgb(21, 128, 61)', dismiss: TEXT_DEFAULT },
  warning: { surface: 'rgb(161, 98, 7)', message: 'rgb(161, 98, 7)', description: TEXT_DEFAULT, icon: 'rgb(161, 98, 7)', dismiss: TEXT_DEFAULT },
  danger: { surface: 'rgb(185, 28, 28)', message: 'rgb(185, 28, 28)', description: TEXT_DEFAULT, icon: 'rgb(185, 28, 28)', dismiss: TEXT_DEFAULT },
};

// Font Awesome 7 Free Solid glyph per status, identified by its viewBox.
const iconViewBox: Record<AlertStatus, string> = {
  default: '0 0 576 512',
  info: '0 0 512 512',
  success: '0 0 512 512',
  warning: '0 0 512 512',
  danger: '0 0 512 512',
};

type Measured = {
  width: number;
  height: number;
  backgroundColor: string;
  borderRadius: string;
  outlineStyle: string;
  outlineWidth: string;
  outlineColor: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  columnGap: string;
  fontFamily: string;
  contentRowGap: string | null;
  message: { fontSize: string; lineHeight: string; fontWeight: string; color: string; text: string } | null;
  description: { fontSize: string; lineHeight: string; fontWeight: string; color: string; text: string } | null;
  icon: { color: string; viewBox: string; width: number; height: number } | null;
  dismiss: { color: string; viewBox: string; label: string | null } | null;
};

test('renders every Figma alert variant with the design system values', async ({ page }) => {
  await page.goto('http://localhost:3000/alert');

  const measured = await page.evaluate(() => {
    const read = (element: Element | null | undefined) => {
      if (!element) {
        return null;
      }

      const style = getComputedStyle(element);

      return {
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        fontWeight: style.fontWeight,
        color: style.color,
        text: element.textContent?.trim() ?? '',
      };
    };

    const result: Record<string, unknown> = {};

    for (const element of Array.from(document.querySelectorAll('[data-node-id]'))) {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      const content = element.querySelector('[data-name="Content"]');
      const iconSlot = element.querySelector('[data-name="Icon"]');
      const iconSvg = iconSlot?.querySelector('svg');
      const iconRect = iconSvg?.getBoundingClientRect();
      const dismiss = element.querySelector('[data-name="Dismiss"]');
      const dismissSvg = dismiss?.querySelector('svg');

      result[element.getAttribute('data-node-id') as string] = {
        width: rect.width,
        height: rect.height,
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor,
        paddingTop: style.paddingTop,
        paddingRight: style.paddingRight,
        paddingBottom: style.paddingBottom,
        paddingLeft: style.paddingLeft,
        columnGap: style.columnGap,
        fontFamily: style.fontFamily,
        contentRowGap: content ? getComputedStyle(content).rowGap : null,
        message: read(element.querySelector('[data-name="Message"] p')),
        description: read(element.querySelector('[data-name="Description"] p')),
        icon: iconSlot && iconSvg && iconRect
          ? {
              color: getComputedStyle(iconSlot).color,
              viewBox: iconSvg.getAttribute('viewBox') ?? '',
              width: iconRect.width,
              height: iconRect.height,
            }
          : null,
        dismiss: dismiss && dismissSvg
          ? {
              color: getComputedStyle(dismiss).color,
              viewBox: dismissSvg.getAttribute('viewBox') ?? '',
              label: dismiss.getAttribute('aria-label'),
            }
          : null,
      };
    }

    return result as Record<string, Measured>;
  });

  let checked = 0;

  for (const kind of kinds) {
    for (const invert of alertInvertsFor(kind)) {
      const key = invert ? 'true' : 'false';

      for (const status of statuses) {
        const palette = kind === 'filled' ? filled[key][status] : bordered[status];

        for (const size of sizes) {
          const nodeId = figmaNodeIds[kind][key]?.[status][size] as string;
          const actual = measured[nodeId];
          const expected = metrics[size];

          expect(actual, `missing alert for Figma node ${nodeId}`).toBeDefined();

          // Geometry: the Figma frame is 768 wide, with min-width size-64 (256).
          expect(actual.width, `${nodeId} width`).toBe(768);
          expect(actual.height, `${nodeId} height`).toBe(expected.height);
          expect(actual.borderRadius, `${nodeId} radius`).toBe('4px');

          // Padding is uniform, and the root gap separates icon / content / dismiss.
          for (const side of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] as const) {
            expect(actual[side], `${nodeId} ${side}`).toBe(`${expected.padding}px`);
          }
          expect(actual.columnGap, `${nodeId} gap`).toBe(`${expected.gap}px`);
          expect(actual.contentRowGap, `${nodeId} content gap`).toBe(`${expected.contentGap}px`);

          // Kind: filled paints a background, outlined and dashed a 1px inset stroke.
          if (kind === 'filled') {
            expect(actual.backgroundColor, `${nodeId} background`).toBe(palette.surface);
            expect(actual.outlineStyle, `${nodeId} outline style`).toBe('none');
          } else {
            expect(actual.backgroundColor, `${nodeId} background`).toBe(TRANSPARENT);
            expect(actual.outlineStyle, `${nodeId} outline style`).toBe(kind === 'dashed' ? 'dashed' : 'solid');
            expect(actual.outlineWidth, `${nodeId} outline width`).toBe('1px');
            expect(actual.outlineColor, `${nodeId} outline color`).toBe(palette.surface);
          }

          expect(actual.fontFamily, `${nodeId} font`).toBe('Inter, "Inter Fallback"');

          // Message: Medium/text-sm | text-base | text-lg.
          expect(actual.message, `${nodeId} message`).not.toBeNull();
          expect(actual.message?.fontSize, `${nodeId} message size`).toBe(`${expected.message[0]}px`);
          expect(actual.message?.lineHeight, `${nodeId} message line height`).toBe(`${expected.message[1]}px`);
          expect(actual.message?.fontWeight, `${nodeId} message weight`).toBe('500');
          expect(actual.message?.color, `${nodeId} message color`).toBe(palette.message);

          // Description: Regular/text-xs | text-sm | text-base.
          expect(actual.description, `${nodeId} description`).not.toBeNull();
          expect(actual.description?.fontSize, `${nodeId} description size`).toBe(`${expected.description[0]}px`);
          expect(actual.description?.lineHeight, `${nodeId} description line height`).toBe(`${expected.description[1]}px`);
          expect(actual.description?.fontWeight, `${nodeId} description weight`).toBe('400');
          expect(actual.description?.color, `${nodeId} description color`).toBe(palette.description);

          // Prefix icon: the status glyph, drawn at the size's font size.
          expect(actual.icon, `${nodeId} icon`).not.toBeNull();
          expect(actual.icon?.viewBox, `${nodeId} icon glyph`).toBe(iconViewBox[status]);
          expect(actual.icon?.color, `${nodeId} icon color`).toBe(palette.icon);
          expect(actual.icon?.height, `${nodeId} icon height`).toBeCloseTo(expected.message[0], 2);

          const [, , viewBoxWidth, viewBoxHeight] = iconViewBox[status].split(' ').map(Number);
          expect(actual.icon?.width, `${nodeId} icon width`).toBeCloseTo(
            (expected.message[0] * viewBoxWidth) / viewBoxHeight,
            2,
          );

          // Dismiss: the xmark glyph, 384x512.
          expect(actual.dismiss, `${nodeId} dismiss`).not.toBeNull();
          expect(actual.dismiss?.viewBox, `${nodeId} dismiss glyph`).toBe('0 0 384 512');
          expect(actual.dismiss?.color, `${nodeId} dismiss color`).toBe(palette.dismiss);
          expect(actual.dismiss?.label, `${nodeId} dismiss label`).toBe('Dismiss');

          checked += 1;
        }
      }
    }
  }

  // 3 kinds x 5 statuses x 3 sizes, with Invert=true only for kind=filled.
  expect(checked).toBe(60);

  // The Next.js dev indicator is an overlay portal, not part of the design.
  await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });

  await expect(page.locator('main')).toHaveScreenshot('alert-variants.png');
});
