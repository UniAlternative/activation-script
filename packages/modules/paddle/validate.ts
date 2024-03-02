import { ResponseDone } from '@as/shared'

/**
 * Paddle verification
 * @url https://v3.paddleapi.com/3.2/license/verify
 */
export function paddleVerify() {
  const body = {
    success: true,
    response: {
      type: 'personal',
      expires: 1,
      expiry_date: 1999999999999,
    },
    signature: '',
  }
  return ResponseDone({
    body,
  })
}
