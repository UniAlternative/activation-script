import { ResponseDone } from '@as/shared'

/**
 * @url https://lo.cafe/api/notchnook-verify-key
 */
export function locafeNotchNook() {
  return ResponseDone({
    body: {
      valid: true,
    },
  })
}
