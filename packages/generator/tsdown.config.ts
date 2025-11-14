import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['index.ts'],
  outDir: '../../dist',
  format: ['esm'],
  clean: true,
  minify: true,
})
