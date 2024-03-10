import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-ts'
import { inject } from '../shared/src/plugins/rollup/inject.js'

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
    inject({
      COMMIT_HASH: getGitCommitHash(),
      CORE_VERSION: getCoreVersion(),
    }),
  ],
})

function getGitCommitHash() {
  const isGitExists = execSync('which git').toString().trim()
  if (!isGitExists)
    return ''
  const isGitRepo = execSync('git rev-parse --is-inside-work-tree').toString().trim()
  if (isGitRepo !== 'true')
    return ''
  return execSync('git rev-parse HEAD').toString().trim()
}

function getCoreVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
  return packageJson.version
}
