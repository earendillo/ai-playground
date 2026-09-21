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

// Figma variables: color/background/<status>/default and their /invert/ counterparts,
// paired with color/text/default (#030712) or color/text/base (#ffffff).
const statusTokens: Record<'default' | 'invert', Record<BadgeStatus, StatusTokens>> = {
  default: {
    default: { background: 'bg-[#f3f4f6]', foreground: 'text-[#030712]' },
    info: { background: 'bg-[#1d4ed8]', foreground: 'text-[#ffffff]' },
    success: { background: 'bg-[#15803d]', foreground: 'text-[#ffffff]' },
    warning: { background: 'bg-[#a16207]', foreground: 'text-[#ffffff]' },
    danger: { background: 'bg-[#b91c1c]', foreground: 'text-[#ffffff]' },
  },
  invert: {
    default: { background: 'bg-[#374151]', foreground: 'text-[#ffffff]' },
    info: { background: 'bg-[#e0e7ff]', foreground: 'text-[#030712]' },
    success: { background: 'bg-[#dcfce7]', foreground: 'text-[#030712]' },
    warning: { background: 'bg-[#fef9c3]', foreground: 'text-[#030712]' },
    danger: { background: 'bg-[#fee2e2]', foreground: 'text-[#030712]' },
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

  // Figma: border/width/default 1px in color/border/base (#ffffff) on every variant.
  const base = `inline-flex items-center justify-center border border-solid border-[#ffffff] ${palette.background} ${shapeTokens[shape]}`;

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
