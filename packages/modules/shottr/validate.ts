import { ResponseDone, destr } from '@as/shared'

/**
 * @url https://shottr.cc/licensing/verify.php
 * @url https://shottr-verify-license.blimps.workers.dev
 */
export function shottrVerifyLicense() {
  const body = {
    // ...destr($response.body),
    hash: destr($request.body).hash,
    tier: '1',
    // explanation: undefined,
  }
  return ResponseDone({
    body,
  })
}
