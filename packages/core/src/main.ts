import { ResponseDone, Timer } from '@as/shared'
import { launch } from './launch'

const timer = new Timer()
timer.startTimer()
console.log(`===== Activator Script Handler =====`)
console.log(`===== Author: @wibus-wee | Version: ${CORE_VERSION} | Commit: ${COMMIT_HASH?.slice(0, 7) || 'main'} =====`);

(async () => {
  $done(
    await launch().catch((e) => {
      console.log(`Error -> ${e}`)
      return ResponseDone({
        status: 500,
        body: {
          msg: 'Activation Script Error. Please check the logs for more details.',
          error: {
            message: e.message,
            stack: e.stack,
          },
        },
      })
    }).finally(() => {
      timer.endTimer()
      console.log(`===== Finished in ${timer.getDurationInSeconds()}s =====`)
    }),
  )
})()
