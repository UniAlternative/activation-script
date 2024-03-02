import { buildResponse } from '@as/shared'

/**
 * @url https://shottr.cc/api/telemetry.php
 */
export function shottrTelemetry() {
  buildResponse({
    body: {
      result: 'success',
    },
  })
}
