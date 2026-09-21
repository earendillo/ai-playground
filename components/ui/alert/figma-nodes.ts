import type { AlertKind, AlertSize, AlertStatus } from './alert';

/**
 * Figma node ids per variant, read from `get_metadata` on component set 1515:6165.
 * Indexed as figmaNodeIds[kind][invert][status][size].
 *
 * `Invert=true` exists only for `Kind=filled`, so `outlined` and `dashed` carry the
 * `false` key alone - 60 variants in total.
 */
export const figmaNodeIds: Record<
  AlertKind,
  Partial<Record<'false' | 'true', Record<AlertStatus, Record<AlertSize, string>>>>
> = {
  filled: {
    false: {
      default: { sm: '1515:6124', md: '1538:1697', lg: '1538:2097' },
      info: { sm: '1536:513', md: '1538:1867', lg: '1538:2267' },
      success: { sm: '1536:589', md: '1538:1747', lg: '1538:2147' },
      warning: { sm: '1536:1235', md: '1538:1757', lg: '1538:2157' },
      danger: { sm: '1536:1331', md: '1538:1767', lg: '1538:2167' },
    },
    true: {
      default: { sm: '1536:461', md: '1538:1707', lg: '1538:2107' },
      info: { sm: '1515:6150', md: '1538:1737', lg: '1538:2137' },
      success: { sm: '1536:605', md: '1538:1837', lg: '1538:2237' },
      warning: { sm: '1536:1283', md: '1538:1807', lg: '1538:2207' },
      danger: { sm: '1536:1349', md: '1538:1777', lg: '1538:2177' },
    },
  },
  outlined: {
    false: {
      default: { sm: '1536:481', md: '1538:1717', lg: '1538:2117' },
      info: { sm: '1536:529', md: '1538:1877', lg: '1538:2277' },
      success: { sm: '1536:1179', md: '1538:1847', lg: '1538:2247' },
      warning: { sm: '1536:1299', md: '1538:1817', lg: '1538:2217' },
      danger: { sm: '1536:1365', md: '1538:1787', lg: '1538:2187' },
    },
  },
  dashed: {
    false: {
      default: { sm: '1536:547', md: '1538:1727', lg: '1538:2127' },
      info: { sm: '1536:565', md: '1538:1887', lg: '1538:2287' },
      success: { sm: '1536:1195', md: '1538:1857', lg: '1538:2257' },
      warning: { sm: '1536:1315', md: '1538:1827', lg: '1538:2227' },
      danger: { sm: '1536:1381', md: '1538:1797', lg: '1538:2197' },
    },
  },
};

/** `Invert=true` is only defined for `Kind=filled`. */
export function alertInvertsFor(kind: AlertKind): boolean[] {
  return figmaNodeIds[kind].true !== undefined ? [false, true] : [false];
}
