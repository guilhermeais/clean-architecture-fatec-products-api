import { defineConfig, mergeConfig } from 'vitest/config'
import defaultConfig from './vitest.config'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    test: {
      watch: false,
      include: ['**/**/*.test.ts'],
      maxConcurrency: 1,
    },
  })
)
