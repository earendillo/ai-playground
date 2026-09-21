import type { BadgeSize } from './badge';

/**
 * Font Awesome 7 Free "plus" - the prefix icon the Figma badge variants use.
 * Figma renders the glyph at 13x14 (lg), 11x12 (md) and 7x8 (sm) inside the icon slot.
 */
const glyphSize: Record<BadgeSize, string> = {
  lg: 'w-[13px] h-[14px]',
  md: 'w-[11px] h-[12px]',
  sm: 'w-[7px] h-[8px]',
};

export function PlusIcon({ size }: { size: BadgeSize }) {
  return (
    <svg aria-hidden="true" className={glyphSize[size]} fill="currentColor" viewBox="0 0 448 512">
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
    </svg>
  );
}
