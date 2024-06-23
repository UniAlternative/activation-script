import { ResponseDone } from '@as/shared'
import jwt from 'jsonwebtoken'

/**
 * @url https://lo.cafe/api/notchnook-verify-key
 */
export function locafeNotchNook() {
  const token = jwt.sign({
    valid: false,
    iat: Math.floor(Date.now() / 1000),
  }, 'secret', {
    algorithm: 'RS256',
  })

  return ResponseDone({
    body: {
      token,
    },
  })
}
