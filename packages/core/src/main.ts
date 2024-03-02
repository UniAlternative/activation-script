import packageJson from '../package.json'
import { launch } from './launch'

console.log(`===== Activator Script Handler =====`)
console.log(`===== Author: @wibus-wee | Version: ${packageJson.version} | Commit: ${COMMIT_HASH?.slice(0, 7) || 'main'} =====`)
$done(launch())
