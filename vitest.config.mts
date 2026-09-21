import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Unit tests live next to the code they cover.
    // `tests/` holds Playwright specs, which must not be collected here.
    include: ['scripts/**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**', 'tests/**'],
  },
});
