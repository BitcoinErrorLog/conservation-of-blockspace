import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const base = process.env.VITE_BASE ?? '/'
const dir = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base,
  resolve: {
    alias: {
      '@docs': path.resolve(dir, 'docs'),
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/._*'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
