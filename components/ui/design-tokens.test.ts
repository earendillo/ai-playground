import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Components consume the colour system through theme tokens, never through literal values.
 *
 * The Figma values themselves live in `app/globals.css` (and are checked against the Figma
 * snapshot by `components/design-system/color-system/color-tokens.test.ts`), so a hex in a
 * component is a value that has escaped the token layer and will not follow a palette change
 * or a mode switch.
 */
const roots = ['components/ui', 'app/badge', 'app/alert'];

function sourceFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return sourceFiles(full);
      }

      if (entry.name.endsWith('.test.ts') || entry.name.endsWith('.test.tsx')) {
        return [];
      }

      return entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') ? [full] : [];
    });
}

const files = roots.flatMap(sourceFiles);
const css = fs.readFileSync('app/globals.css', 'utf8');
const declared = new Set([...css.matchAll(/^\s*(--color-[a-z0-9-]+):/gm)].map((match) => match[1]));

describe('ui components consume theme tokens', () => {
  it('finds the component sources', () => {
    expect(files.length).toBeGreaterThan(8);
  });

  it.each(files)('%s contains no colour literals', (file) => {
    const source = fs.readFileSync(file, 'utf8');
    const literals = [
      // `bg-[#f3f4f6]`, `[outline-color:#1d4ed8]`, `fill="#ffffff"`, …
      ...source.matchAll(/#[0-9a-fA-F]{3,8}\b/g),
      ...source.matchAll(/\brgba?\(/g),
    ].map((match) => match[0]);

    expect(literals, `${file} should reference --color-* tokens instead`).toEqual([]);
  });

  it.each(files)('%s only references tokens the theme declares', (file) => {
    const source = fs.readFileSync(file, 'utf8');
    const referenced = [...source.matchAll(/var\((--color-[a-z0-9-]+)\)/g)].map((match) => match[1]);

    for (const token of referenced) {
      expect(declared.has(token), `${file} references undeclared ${token}`).toBe(true);
    }
  });
});
