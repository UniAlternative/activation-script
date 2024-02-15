import { buildResponse } from '@as/shared'

/**
 * Paddle activation
 * @url https://v3.paddleapi.com/3.2/license/activate
 */
export function paddleActivate() {
  const body = $request.body
  if (!body) {
    buildResponse({
      body: {
        success: false,
        response: {
          error: '[Surge] Activator: No body found',
        },
      },
    })
    return
  }
  const _body = body.split('&')
  let product_id = ''
  for (const k of _body) {
    if (k.includes('product_id'))
      product_id = k.split('=')[1]
  }

  buildResponse({
    body: {
      success: true,
      response: {
        product_id,
        activation_id: 'QiuChenly',
        type: 'personal',
        expires: 1,
        expiry_date: 1999999999999,
      },
    },
  })
}
