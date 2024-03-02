import { ResponseDone } from '@as/shared'

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
export function lemonSqueezyActive() {
  return ResponseDone({
    body: {
      activated: true,
      instance: {
        id: 'wibus-wee',
      },
      error: null,
    },
  })
}
