import { buildResponse } from '@as/shared'

/**
 * @url https://shottr.cc/licensing/verify.php
 */
export function shottrVerifyLicense() {
  const body = {
    tier: '',
  }
  buildResponse({
    body,
  })
}
