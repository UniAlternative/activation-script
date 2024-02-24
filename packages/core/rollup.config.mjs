import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-ts'

export default defineConfig({
  input: [
    'src/main.ts',
  ],
  output: {
    dir: '../../dist',
    format: 'cjs',
  },
  plugins: [
    nodeResolve(),
    typescript(),
    json(),
  ],

})
