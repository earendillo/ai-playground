import type { ReactNode } from 'react';

/**
 * Badge - Figma "Plus UI" design system, component set `2321:8706`.
 *
 * Variant axes mirror the Figma properties: Kind, Status, Size, Invert, Shape.
 * All measurements come from the Figma MCP design context for the component set.
 */
export type BadgeKind = 'default' | 'icon' | 'text';
export type BadgeStatus = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'full rounded' | 'rounded';

type SizeTokens = {
  /** Badge box height, and minimum width, for `icon`/`text` kinds. */
  box: string;
  square: string;
  gap: string;
  paddingX: string;
  /** Prefix icon slot, a square centred flex box. */
  icon: string;
  /** Dot diameter for the `default` kind. */
  dot: string;
  font: string;
};

// Figma: sizes sm / md* / lg. py is space-0-5 (2px) for every size.
const sizeTokens: Record<BadgeSize, SizeTokens> = {
  sm: {
    box: 'h-[22px] min-w-[22px]',
    square: 'w-[22px]',
    gap: 'gap-[4px]',
    paddingX: 'px-[4px]',
    icon: 'size-[12px]',
    dot: 'size-[6px]',
    font: 'text-[12px] leading-[16px]',
  },
  md: {
    box: 'h-[24px] min-w-[24px]',
    square: 'w-[24px]',
    gap: 'gap-[6px]',
    paddingX: 'px-[6px]',
    icon: 'size-[16px]',
    dot: 'size-[8px]',
    font: 'text-[14px] leading-[20px]',
  },
  lg: {
    box: 'h-[28px] min-w-[28px]',
    square: 'w-[28px]',
    gap: 'gap-[6px]',
    paddingX: 'px-[6px]',
    icon: 'size-[20px]',
    dot: 'size-[10px]',
    font: 'text-[16px] leading-[24px]',
  },
};

type StatusTokens = { background: string; foreground: string };

/**
 * Figma variables per Status x Invert, from the Color Tokens page (`4922:6167`):
 * `color/background/<status>/default` and its `/invert/` counterpart, paired with
 * `color/text/default` or `color/text/base`.
 *
 * One exception: the Figma badge fills Status=info, Invert=true with indigo/100, which is
 * `color/background/primary/invert/default`, not the blue/100 the token page defines for
 * `color/background/info/invert/default`. The semantic shade is used here so the value stays
 * in the token system and the rendered colour stays what the design file specifies; switching
 * it to the info role would change the colour, so that is a design-file decision.
 */
const statusTokens: Record<'default' | 'invert', Record<BadgeStatus, StatusTokens>> = {
  default: {
    default: { background: 'bg-background-default-default', foreground: 'text-text-default' },
    info: { background: 'bg-background-info-default', foreground: 'text-text-base' },
    success: { background: 'bg-background-success-default', foreground: 'text-text-base' },
    warning: { background: 'bg-background-warning-default', foreground: 'text-text-base' },
    danger: { background: 'bg-background-danger-default', foreground: 'text-text-base' },
  },
  invert: {
    default: { background: 'bg-background-default-invert-default', foreground: 'text-text-base' },
    info: { background: 'bg-primary-100', foreground: 'text-text-default' },
    success: { background: 'bg-background-success-invert-default', foreground: 'text-text-default' },
    warning: { background: 'bg-background-warning-invert-default', foreground: 'text-text-default' },
    danger: { background: 'bg-background-danger-invert-default', foreground: 'text-text-default' },
  },
};

// Figma: border/radius/full (9999) and border/radius/default (4).
const shapeTokens: Record<BadgeShape, string> = {
  'full rounded': 'rounded-[9999px]',
  rounded: 'rounded-[4px]',
};

export type BadgeProps = {
  kind?: BadgeKind;
  status?: BadgeStatus;
  size?: BadgeSize;
  invert?: boolean;
  shape?: BadgeShape;
  /** Prefix icon, rendered inside the size-specific icon slot. */
  icon?: ReactNode;
  /** Label, used by the `text` kind. */
  children?: ReactNode;
  /** Figma node id of the rendered variant, used for design verification. */
  nodeId?: string;
  /** Accessible name for the `default` and `icon` kinds, which have no label. */
  label?: string;
  className?: string;
};

export function Badge({
  kind = 'text',
  status = 'default',
  size = 'lg',
  invert = false,
  shape = 'full rounded',
  icon,
  children,
  nodeId,
  label,
  className,
}: BadgeProps) {
  const tokens = sizeTokens[size];
  const palette = statusTokens[invert ? 'invert' : 'default'][status];

  // Figma: border/width/default 1px in color/border/base on every variant.
  const base = `inline-flex items-center justify-center border border-solid border-border-base ${palette.background} ${shapeTokens[shape]}`;

  if (kind === 'default') {
    return (
      <span
        aria-label={label}
        className={`${base} ${tokens.dot} ${className ?? ''}`}
        data-node-id={nodeId}
        role={label ? 'img' : undefined}
      />
    );
  }

  const isIconOnly = kind === 'icon';

  return (
    <span
      aria-label={isIconOnly ? label : undefined}
      className={`${base} ${tokens.box} ${isIconOnly ? tokens.square : ''} ${tokens.gap} ${tokens.paddingX} py-[2px] font-[family-name:var(--font-inter)] font-normal ${tokens.font} ${palette.foreground} ${className ?? ''}`}
      data-node-id={nodeId}
      role={isIconOnly && label ? 'img' : undefined}
    >
      {icon ? (
        <span aria-hidden="true" className={`flex shrink-0 items-center justify-center ${tokens.icon}`} data-name="Prefix Icon">
          {icon}
        </span>
      ) : null}
      {!isIconOnly && children !== undefined ? (
        <span className="flex shrink-0 items-center whitespace-nowrap" data-name="Content">
          {children}
        </span>
      ) : null}
    </span>
  );
}
