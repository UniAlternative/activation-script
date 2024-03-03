import { launch } from './launch'

console.log(`===== Activator Script Handler =====`)
console.log(`===== Author: @wibus-wee | Version: ${CORE_VERSION} | Commit: ${COMMIT_HASH?.slice(0, 7) || 'main'} =====`);

(async () => {
  $done(await launch())
})()
