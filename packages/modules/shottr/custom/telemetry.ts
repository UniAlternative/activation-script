import { ResponseDone } from '@as/shared'

/**
 * @url https://shottr.cc/api/telemetry.php
 */
export function shottrTelemetry() {
  return ResponseDone({
    body: {
      result: 'success',
    },
  })
}
