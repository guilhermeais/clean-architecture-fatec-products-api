import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: false,
    setupFiles: [
      'tests/vitest.setup.ts',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
    ]
  }
})