import { test, expect } from '@playwright/test';
import { figmaNodeIds } from '@/components/ui/badge';
import type { BadgeSize } from '@/components/ui/badge';

/**
 * Expected values below come from the Figma MCP design context for component set
 * `2321:8706` (Plus UI), not from the implementation.
 */
const statuses = ['default', 'info', 'success', 'warning', 'danger'] as const;
const sizes: BadgeSize[] = ['lg', 'md', 'sm'];

// color/background/<status>/default and color/text/default | color/text/base.
const palette = {
  false: {
    default: { background: 'rgb(243, 244, 246)', color: 'rgb(3, 7, 18)' },
    info: { background: 'rgb(29, 78, 216)', color: 'rgb(255, 255, 255)' },
    success: { background: 'rgb(21, 128, 61)', color: 'rgb(255, 255, 255)' },
    warning: { background: 'rgb(161, 98, 7)', color: 'rgb(255, 255, 255)' },
    danger: { background: 'rgb(185, 28, 28)', color: 'rgb(255, 255, 255)' },
  },
  true: {
    default: { background: 'rgb(55, 65, 81)', color: 'rgb(255, 255, 255)' },
    info: { background: 'rgb(224, 231, 255)', color: 'rgb(3, 7, 18)' },
    success: { background: 'rgb(220, 252, 231)', color: 'rgb(3, 7, 18)' },
    warning: { background: 'rgb(254, 249, 195)', color: 'rgb(3, 7, 18)' },
    danger: { background: 'rgb(254, 226, 226)', color: 'rgb(3, 7, 18)' },
  },
} as const;

// Sizes sm / md* / lg. `text` widths are the Figma frame widths for the label "Badge".
const metrics = {
  lg: { box: 28, dot: 10, paddingX: 6, gap: 6, fontSize: 16, lineHeight: 24, textWidth: 87 },
  md: { box: 24, dot: 8, paddingX: 6, gap: 6, fontSize: 14, lineHeight: 20, textWidth: 77 },
  sm: { box: 22, dot: 6, paddingX: 4, gap: 4, fontSize: 12, lineHeight: 16, textWidth: 61 },
} as const;

const radii = { 'full rounded': '9999px', rounded: '4px' } as const;

type Measured = {
  width: number;
  height: number;
  backgroundColor: string;
  color: string;
  borderRadius: string;
  borderTopWidth: string;
  borderTopColor: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  columnGap: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  text: string;
  iconSlot: { width: number; height: number } | null;
};

test('renders every Figma badge variant with the design system values', async ({ page }) => {
  await page.goto('http://localhost:3000/badge');

  const measured = await page.evaluate(() => {
    const result: Record<string, unknown> = {};

    for (const element of Array.from(document.querySelectorAll('[data-node-id]'))) {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const slot = element.querySelector('[data-name="Prefix Icon"]');
      const slotRect = slot?.getBoundingClientRect();

      result[element.getAttribute('data-node-id') as string] = {
        width: rect.width,
        height: rect.height,
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderRadius: style.borderRadius,
        borderTopWidth: style.borderTopWidth,
        borderTopColor: style.borderTopColor,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        columnGap: style.columnGap,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        fontWeight: style.fontWeight,
        text: element.textContent?.trim() ?? '',
        iconSlot: slotRect ? { width: slotRect.width, height: slotRect.height } : null,
      };
    }

    return result as Record<string, Measured>;
  });

  let checked = 0;

  for (const kind of ['default', 'icon', 'text'] as const) {
    for (const shape of Object.keys(figmaNodeIds[kind]) as (keyof typeof radii)[]) {
      for (const size of sizes) {
        for (const invert of ['false', 'true'] as const) {
          const ids = figmaNodeIds[kind][shape][size][invert];
          const size_ = metrics[size];

          statuses.forEach((status, index) => {
            const nodeId = ids[index];
            const actual = measured[nodeId];
            const colors = palette[invert][status];

            expect(actual, `missing badge for Figma node ${nodeId}`).toBeDefined();
            expect(actual.backgroundColor, `${nodeId} background`).toBe(colors.background);

            // border/width/default 1px in color/border/base (#ffffff).
            expect(actual.borderTopWidth, `${nodeId} border width`).toBe('1px');
            expect(actual.borderTopColor, `${nodeId} border color`).toBe('rgb(255, 255, 255)');
            expect(actual.borderRadius, `${nodeId} radius`).toBe(radii[shape]);

            if (kind === 'default') {
              // Kind=default is a bare status dot: no padding, no content.
              expect(actual.width, `${nodeId} width`).toBe(size_.dot);
              expect(actual.height, `${nodeId} height`).toBe(size_.dot);
              expect(actual.paddingLeft, `${nodeId} padding`).toBe('0px');
              expect(actual.text, `${nodeId} text`).toBe('');
              checked += 1;
              return;
            }

            expect(actual.height, `${nodeId} height`).toBe(size_.box);
            expect(actual.paddingTop, `${nodeId} padding top`).toBe('2px');
            expect(actual.paddingBottom, `${nodeId} padding bottom`).toBe('2px');
            expect(actual.paddingLeft, `${nodeId} padding left`).toBe(`${size_.paddingX}px`);
            expect(actual.paddingRight, `${nodeId} padding right`).toBe(`${size_.paddingX}px`);
            expect(actual.columnGap, `${nodeId} gap`).toBe(`${size_.gap}px`);
            expect(actual.color, `${nodeId} text color`).toBe(colors.color);
            expect(actual.fontFamily, `${nodeId} font`).toBe('Inter, "Inter Fallback"');
            expect(actual.fontSize, `${nodeId} font size`).toBe(`${size_.fontSize}px`);
            expect(actual.lineHeight, `${nodeId} line height`).toBe(`${size_.lineHeight}px`);
            expect(actual.fontWeight, `${nodeId} font weight`).toBe('400');

            if (kind === 'icon') {
              expect(actual.width, `${nodeId} width`).toBe(size_.box);
              expect(actual.text, `${nodeId} text`).toBe('');
            } else {
              expect(actual.text, `${nodeId} text`).toBe('Badge');
              // Figma rounds the label advance width; Chromium measures "Badge" ~1.4px wider.
              expect(Math.abs(actual.width - size_.textWidth), `${nodeId} width`).toBeLessThanOrEqual(2);
            }

            // Prefix Icon slot is a square box sized per Figma: 20 / 16 / 12.
            const iconSlot = { lg: 20, md: 16, sm: 12 }[size];
            expect(actual.iconSlot, `${nodeId} icon slot`).toEqual({ width: iconSlot, height: iconSlot });

            checked += 1;
          });
        }
      }
    }
  }

  // 3 kinds x sizes x invert x statuses, with kind=default only in the full rounded shape.
  expect(checked).toBe(150);

  // The Next.js dev indicator is an overlay portal, not part of the design.
  await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });

  await expect(page.locator('main')).toHaveScreenshot('badge-variants.png');
});
