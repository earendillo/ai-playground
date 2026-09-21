import { converter } from 'culori';

const toRgb = converter('rgb');

export function normalizeColor(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  const rgb = toRgb(value);

  if (!rgb) {
    return value;
  }

  return {
    r: Math.round(rgb.r * 255),
    g: Math.round(rgb.g * 255),
    b: Math.round(rgb.b * 255),
  };
} 