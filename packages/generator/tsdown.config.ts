import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['index.ts'],
  outDir: '../../dist',
  format: ['esm'],
  clean: false,
  minify: true,
  noExternal: [
    '@as/dashboard',
    '@as/modules',
    '@as/shared',
  ],
})
