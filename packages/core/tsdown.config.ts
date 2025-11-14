import { defineConfig } from 'tsdown'

// function getGitCommitHash() {
//   try {
//     const isGitExists = execSync('which git').toString().trim()
//     if (!isGitExists)
//       return ''
//     const isGitRepo = execSync('git rev-parse --is-inside-work-tree').toString().trim()
//     if (isGitRepo !== 'true')
//       return ''
//     return execSync('git rev-parse HEAD').toString().trim()
//   }
//   catch {
//     return ''
//   }
// }

// function getCoreVersion() {
//   const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
//   return packageJson.version
// }

export default defineConfig({
  entry: ['src/main.ts'],
  outDir: '../../dist',
  format: ['cjs'],
  clean: true,
  minify: true,
  noExternal: [
    '@as/dashboard',
    '@as/modules',
    '@as/shared',
  ],
})
