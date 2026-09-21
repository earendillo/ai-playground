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

// Figma sizes sm / md* / lg. Every padding and gap is a step of the Figma spacing scale and
// every text size a step of the type scale, so the tokens carry the measurements.
const sizeTokens: Record<AlertSize, SizeTokens> = {
  sm: {
    padding: 'p-3',
    gap: 'gap-2.5',
    contentGap: 'gap-2',
    message: 'text-sm',
    description: 'text-xs',
    iconBox: 'h-5',
  },
  md: {
    padding: 'p-3.5',
    gap: 'gap-3',
    contentGap: 'gap-2.5',
    message: 'text-base',
    description: 'text-sm',
    iconBox: 'h-6',
  },
  lg: {
    padding: 'p-4',
    gap: 'gap-3.5',
    contentGap: 'gap-3',
    message: 'text-lg',
    description: 'text-base',
    iconBox: 'h-7',
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
 * `filled` paints `color/background/<status>/default` and tints the prefix icon with the
 * opposite ramp (`color/text/invert/<status>`); `outlined` and `dashed` paint
 * `color/border/<status>` and colour only the message and the icon, leaving the description
 * at `color/text/default`.
 *
 * Every entry is a theme token from `app/globals.css`, so a palette change in Figma reaches
 * the component through the token layer rather than through edits here.
 */
const filled: Record<'default' | 'invert', Record<AlertStatus, Palette>> = {
  default: {
    default: {
      surface: 'bg-background-default-default',
      message: 'text-text-default',
      description: 'text-text-default',
      icon: 'text-text-default',
      dismiss: 'text-text-default',
    },
    info: {
      surface: 'bg-background-info-default',
      message: 'text-text-base',
      description: 'text-text-base',
      icon: 'text-text-invert-info',
      dismiss: 'text-text-base',
    },
    success: {
      surface: 'bg-background-success-default',
      message: 'text-text-base',
      description: 'text-text-base',
      icon: 'text-text-invert-success',
      dismiss: 'text-text-base',
    },
    warning: {
      surface: 'bg-background-warning-default',
      message: 'text-text-base',
      description: 'text-text-base',
      icon: 'text-text-invert-warning',
      dismiss: 'text-text-base',
    },
    danger: {
      surface: 'bg-background-danger-default',
      message: 'text-text-base',
      description: 'text-text-base',
      icon: 'text-text-invert-danger',
      dismiss: 'text-text-base',
    },
  },
  invert: {
    default: {
      surface: 'bg-background-default-invert-default',
      message: 'text-text-base',
      description: 'text-text-base',
      icon: 'text-text-base',
      dismiss: 'text-text-base',
    },
    info: {
      surface: 'bg-background-info-invert-default',
      message: 'text-text-default',
      description: 'text-text-default',
      icon: 'text-text-info',
      dismiss: 'text-text-default',
    },
    success: {
      surface: 'bg-background-success-invert-default',
      message: 'text-text-default',
      description: 'text-text-default',
      icon: 'text-text-success',
      dismiss: 'text-text-default',
    },
    warning: {
      surface: 'bg-background-warning-invert-default',
      message: 'text-text-default',
      description: 'text-text-default',
      icon: 'text-text-warning',
      dismiss: 'text-text-default',
    },
    danger: {
      surface: 'bg-background-danger-invert-default',
      message: 'text-text-default',
      description: 'text-text-default',
      icon: 'text-text-danger',
      dismiss: 'text-text-default',
    },
  },
};

const bordered: Record<AlertStatus, Palette> = {
  default: {
    surface: '[outline-color:var(--color-border-default)]',
    message: 'text-text-default',
    description: 'text-text-default',
    icon: 'text-text-default',
    dismiss: 'text-text-default',
  },
  info: {
    surface: '[outline-color:var(--color-border-info)]',
    message: 'text-text-info',
    description: 'text-text-default',
    icon: 'text-text-info',
    dismiss: 'text-text-default',
  },
  success: {
    surface: '[outline-color:var(--color-border-success)]',
    message: 'text-text-success',
    description: 'text-text-default',
    icon: 'text-text-success',
    dismiss: 'text-text-default',
  },
  warning: {
    surface: '[outline-color:var(--color-border-warning)]',
    message: 'text-text-warning',
    description: 'text-text-default',
    icon: 'text-text-warning',
    dismiss: 'text-text-default',
  },
  danger: {
    surface: '[outline-color:var(--color-border-danger)]',
    message: 'text-text-danger',
    description: 'text-text-default',
    icon: 'text-text-danger',
    dismiss: 'text-text-default',
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
  outlined: '[outline-width:var(--border-width-default)] [outline-style:solid] [outline-offset:-1px]',
  dashed: '[outline-width:var(--border-width-default)] [outline-style:dashed] [outline-offset:-1px]',
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
      className={`flex min-w-64 items-start rounded-default font-default ${tokens.padding} ${tokens.gap} ${surface} ${className ?? ''}`}
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
            <p className={`min-w-px flex-[1_0_0] font-regular ${tokens.description} ${palette.description}`}>
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
