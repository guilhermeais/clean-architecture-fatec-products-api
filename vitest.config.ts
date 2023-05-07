import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: false,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '.data'
    ]
  }
})