import { describe, expect, it } from 'vitest';
import { normalizeColor } from './normalize';

describe('normalizeColor', () => {
  it('normalizes equivalent color formats to the same RGB value', () => {
    expect(normalizeColor('rgb(0, 0, 0)')).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });

    expect(normalizeColor('#000000')).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });

    expect(normalizeColor('rgba(0, 0, 0, 1)')).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });
  });

  it('keeps non-color values unchanged', () => {
    expect(normalizeColor('hello')).toBe('hello');
    expect(normalizeColor(123)).toBe(123);
    expect(normalizeColor(null)).toBe(null);
  });
});