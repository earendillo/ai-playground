'use client';

import { useEffect, useRef, useState } from 'react';
import { colorVar, type ColorMode, type ColorTokenName } from './color-tokens';

/** `rgb(3, 7, 18)` / `rgba(255, 255, 255, 0)` - as computed styles serialise colours - to hex. */
function toHex(computed: string): string {
  const channels = computed.match(/-?[\d.]+/g);

  if (!channels || channels.length < 3) {
    return computed;
  }

  const [red, green, blue, alpha] = channels.map(Number);
  const pair = (channel: number) => Math.round(channel).toString(16).padStart(2, '0');
  const opaque = `#${pair(red)}${pair(green)}${pair(blue)}`;

  return alpha === undefined || alpha === 1 ? opaque : `${opaque}${pair(alpha * 255)}`;
}

/**
 * A single colour chip.
 *
 * The fill is `var(--color-<token>)`, so the chip renders whatever the Tailwind theme
 * currently defines, and the printed value is read back from the resolved computed style
 * rather than from a copy of the Figma hex.
 *
 * `mode` pins the chip - and only the chip - to one side of the theme by setting `data-theme`,
 * which is how the role token tables show a token's light and dark value next to each other. The
 * captions stay in the page's own mode so they remain legible, as they do in the Figma table.
 *
 * Figma: swatch rectangles are 57px tall, `border/radius/default` (4px), with a
 * 1px rgba(255,255,255,0.1) hairline.
 */
export type ColorSwatchProps = {
  token: ColorTokenName;
  /** Caption above the resolved value - a shade ("950") or a ramp reference ("neutral/100"). */
  label: string;
  /** Secondary caption, e.g. the Figma variable a role token comes from. */
  detail?: string;
  /** Resolve the token in this mode rather than in the surrounding one. */
  mode?: ColorMode;
  /** Figma node id of the corresponding swatch, when the design defines one. */
  nodeId?: string;
  className?: string;
};

export function ColorSwatch({ token, label, detail, mode, nodeId, className }: ColorSwatchProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    setValue(toHex(getComputedStyle(element).backgroundColor));
  }, [token, mode]);

  return (
    <div
      className={`flex min-w-0 flex-col gap-[0.375rem] ${className ?? ''}`}
      data-color-mode={mode}
      data-color-token={token}
    >
      <div
        ref={ref}
        className="h-[3.5625rem] w-full rounded-[0.25rem] border border-solid border-[rgba(255,255,255,0.1)]"
        data-name={label}
        data-node-id={nodeId}
        data-theme={mode}
        style={{ backgroundColor: colorVar(token) }}
      />
      <div className="flex min-w-0 flex-col text-[1rem] leading-[1.5rem] font-medium">
        <span className="break-words text-text-default">{label}</span>
        <span className="break-words text-text-caption" data-color-value={token}>
          {value ?? '—'}
        </span>
        {detail ? <span className="break-words text-[0.75rem] leading-[1rem] text-text-caption">{detail}</span> : null}
      </div>
    </div>
  );
}
