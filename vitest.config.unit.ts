import { defineConfig, mergeConfig } from 'vitest/config'
import defaultConfig from './vitest.config'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    test: {
      include: ['**/**/*.spec.ts'],
      maxConcurrency: 1,
    },
  })
)
