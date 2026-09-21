import type { ReactNode } from 'react';
import { AlertDismissIcon, AlertStatusIcon } from './alert-icons';

/**
 * Alert - Figma "Plus UI" design system, component set `1515:6165`.
 *
 * Variant axes mirror the Figma properties: Kind, Status, Size, Invert. The four
 * Figma boolean slots (Prefix Icon, Message, Description, Dismiss) map onto the
 * `showIcon` / `message` / `description` / `dismissible` props.
 *
 * All measurements come from the Figma MCP snapshot in `artifacts/figma/alert.json`.
 */
export type AlertKind = 'filled' | 'outlined' | 'dashed';
export type AlertStatus = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type AlertSize = 'sm' | 'md' | 'lg';

type SizeTokens = {
  /** Figma: space-3 / space-3-5 / space-4. */
  padding: string;
  /** Root row gap, between the icon, the content column and the dismiss button. */
  gap: string;
  /** Gap between Message and Description inside the content column. */
  contentGap: string;
  message: string;
  description: string;
  /** Icon slot height, the size's line height, so the glyph sits on the first text row. */
  iconBox: string;
};

// Figma sizes sm / md* / lg. Pixel values converted at the 16px root font size.
const sizeTokens: Record<AlertSize, SizeTokens> = {
  sm: {
    padding: 'p-[0.75rem]',
    gap: 'gap-[0.625rem]',
    contentGap: 'gap-[0.5rem]',
    message: 'text-[0.875rem] leading-[1.25rem]',
    description: 'text-[0.75rem] leading-[1rem]',
    iconBox: 'h-[1.25rem]',
  },
  md: {
    padding: 'p-[0.875rem]',
    gap: 'gap-[0.75rem]',
    contentGap: 'gap-[0.625rem]',
    message: 'text-[1rem] leading-[1.5rem]',
    description: 'text-[0.875rem] leading-[1.25rem]',
    iconBox: 'h-[1.5rem]',
  },
  lg: {
    padding: 'p-[1rem]',
    gap: 'gap-[0.875rem]',
    contentGap: 'gap-[0.75rem]',
    message: 'text-[1.125rem] leading-[1.75rem]',
    description: 'text-[1rem] leading-[1.5rem]',
    iconBox: 'h-[1.75rem]',
  },
};

type Palette = {
  /** Background for `filled`, border colour for `outlined` and `dashed`. */
  surface: string;
  message: string;
  description: string;
  icon: string;
  dismiss: string;
};

/**
 * Figma variables per Kind x Invert x Status.
 *
 * `filled` paints `color/background/<status>/...` and tints the prefix icon with the
 * opposite ramp; `outlined` and `dashed` paint `color/border/<status>` and colour only
 * the message and the icon, leaving the description at `color/text/default`.
 */
const filled: Record<'default' | 'invert', Record<AlertStatus, Palette>> = {
  default: {
    default: {
      surface: 'bg-[#f3f4f6]',
      message: 'text-[#030712]',
      description: 'text-[#030712]',
      icon: 'text-[#030712]',
      dismiss: 'text-[#030712]',
    },
    info: {
      surface: 'bg-[#1d4ed8]',
      message: 'text-[#ffffff]',
      description: 'text-[#ffffff]',
      icon: 'text-[#dbeafe]',
      dismiss: 'text-[#ffffff]',
    },
    success: {
      surface: 'bg-[#15803d]',
      message: 'text-[#ffffff]',
      description: 'text-[#ffffff]',
      icon: 'text-[#dcfce7]',
      dismiss: 'text-[#ffffff]',
    },
    warning: {
      surface: 'bg-[#a16207]',
      message: 'text-[#ffffff]',
      description: 'text-[#ffffff]',
      icon: 'text-[#fef9c3]',
      dismiss: 'text-[#ffffff]',
    },
    danger: {
      surface: 'bg-[#b91c1c]',
      message: 'text-[#ffffff]',
      description: 'text-[#ffffff]',
      icon: 'text-[#fee2e2]',
      dismiss: 'text-[#ffffff]',
    },
  },
  invert: {
    default: {
      surface: 'bg-[#374151]',
      message: 'text-[#ffffff]',
      description: 'text-[#ffffff]',
      icon: 'text-[#ffffff]',
      dismiss: 'text-[#ffffff]',
    },
    info: {
      surface: 'bg-[#dbeafe]',
      message: 'text-[#030712]',
      description: 'text-[#030712]',
      icon: 'text-[#1d4ed8]',
      dismiss: 'text-[#030712]',
    },
    success: {
      surface: 'bg-[#dcfce7]',
      message: 'text-[#030712]',
      description: 'text-[#030712]',
      icon: 'text-[#15803d]',
      dismiss: 'text-[#030712]',
    },
    warning: {
      surface: 'bg-[#fef9c3]',
      message: 'text-[#030712]',
      description: 'text-[#030712]',
      icon: 'text-[#a16207]',
      dismiss: 'text-[#030712]',
    },
    danger: {
      surface: 'bg-[#fee2e2]',
      message: 'text-[#030712]',
      description: 'text-[#030712]',
      icon: 'text-[#b91c1c]',
      dismiss: 'text-[#030712]',
    },
  },
};

const bordered: Record<AlertStatus, Palette> = {
  default: {
    surface: '[outline-color:#9ca3af]',
    message: 'text-[#030712]',
    description: 'text-[#030712]',
    icon: 'text-[#030712]',
    dismiss: 'text-[#030712]',
  },
  info: {
    surface: '[outline-color:#1d4ed8]',
    message: 'text-[#1d4ed8]',
    description: 'text-[#030712]',
    icon: 'text-[#1d4ed8]',
    dismiss: 'text-[#030712]',
  },
  success: {
    surface: '[outline-color:#15803d]',
    message: 'text-[#15803d]',
    description: 'text-[#030712]',
    icon: 'text-[#15803d]',
    dismiss: 'text-[#030712]',
  },
  warning: {
    surface: '[outline-color:#a16207]',
    message: 'text-[#a16207]',
    description: 'text-[#030712]',
    icon: 'text-[#a16207]',
    dismiss: 'text-[#030712]',
  },
  danger: {
    surface: '[outline-color:#b91c1c]',
    message: 'text-[#b91c1c]',
    description: 'text-[#030712]',
    icon: 'text-[#b91c1c]',
    dismiss: 'text-[#030712]',
  },
};

function paletteFor(kind: AlertKind, status: AlertStatus, invert: boolean): Palette {
  if (kind === 'filled') {
    return filled[invert ? 'invert' : 'default'][status];
  }

  return bordered[status];
}

/**
 * Figma: border/width/default 1px, solid for `outlined` and dashed for `dashed`.
 *
 * Drawn as an inset outline rather than a CSS border: Figma strokes the frame on the
 * inside, so a border - which grows the box - renders these variants 2px taller than
 * the 84 / 102 / 144 Figma frame heights.
 */
const kindTokens: Record<AlertKind, string> = {
  filled: '',
  outlined: '[outline-width:1px] [outline-style:solid] [outline-offset:-1px]',
  dashed: '[outline-width:1px] [outline-style:dashed] [outline-offset:-1px]',
};

export type AlertProps = {
  kind?: AlertKind;
  status?: AlertStatus;
  size?: AlertSize;
  /** Figma `Invert`, defined only for `kind="filled"`. */
  invert?: boolean;
  /** Figma `Message` slot - the medium-weight headline row. Omit to hide it. */
  message?: ReactNode;
  /** Figma `Description` slot - the regular-weight body row. Omit to hide it. */
  description?: ReactNode;
  /** Figma `Prefix Icon` slot. */
  showIcon?: boolean;
  /** Replaces the status glyph in the prefix icon slot. */
  icon?: ReactNode;
  /** Figma `Dismiss` slot. */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Accessible name for the dismiss button. */
  dismissLabel?: string;
  /** Figma node id of the rendered variant, used for design verification. */
  nodeId?: string;
  className?: string;
};

export function Alert({
  kind = 'filled',
  status = 'default',
  size = 'md',
  invert = false,
  message,
  description,
  showIcon = true,
  icon,
  dismissible = true,
  onDismiss,
  dismissLabel = 'Dismiss',
  nodeId,
  className,
}: AlertProps) {
  const tokens = sizeTokens[size];
  const palette = paletteFor(kind, status, invert);
  const surface = kind === 'filled' ? palette.surface : `${kindTokens[kind]} ${palette.surface}`;

  return (
    <div
      className={`flex min-w-[16rem] items-start rounded-[0.25rem] font-[family-name:var(--font-inter)] ${tokens.padding} ${tokens.gap} ${surface} ${className ?? ''}`}
      data-node-id={nodeId}
      role="alert"
    >
      {showIcon ? (
        <span
          className={`flex shrink-0 items-center ${tokens.iconBox} ${palette.icon}`}
          data-name="Icon"
        >
          {icon ?? <AlertStatusIcon size={size} status={status} />}
        </span>
      ) : null}

      <div className={`flex min-w-px flex-[1_0_0] flex-col items-start ${tokens.contentGap}`} data-name="Content">
        {message !== undefined ? (
          <div className="flex w-full items-start" data-name="Message">
            <p className={`min-w-px flex-[1_0_0] font-medium ${tokens.message} ${palette.message}`}>{message}</p>
          </div>
        ) : null}

        {description !== undefined ? (
          <div className="flex w-full items-start" data-name="Description">
            <p className={`min-w-px flex-[1_0_0] font-normal ${tokens.description} ${palette.description}`}>
              {description}
            </p>
          </div>
        ) : null}
      </div>

      {dismissible ? (
        <button
          aria-label={dismissLabel}
          className={`flex shrink-0 cursor-pointer items-center ${tokens.iconBox} ${palette.dismiss}`}
          data-name="Dismiss"
          onClick={onDismiss}
          type="button"
        >
          <AlertDismissIcon size={size} />
        </button>
      ) : null}
    </div>
  );
}
