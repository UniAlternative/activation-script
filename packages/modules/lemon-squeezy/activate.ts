import { ResponseDone, destr } from '@as/shared'

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
export function lemonSqueezyActive() {
  let product_id = 0
  const body = destr($request.body) as {
    license_key: string
  }
  if (body.license_key === '401934ec-0a54-433c-a299-2a363501d4be')
    product_id = 154474

  return ResponseDone({
    body: {
      activated: true,
      instance: {
        id: 'wibus-wee',
      },
      meta: {
        product_id,
        product_name: 'Lemon Squeezy',
      },
      error: null,
    },
  })
}
