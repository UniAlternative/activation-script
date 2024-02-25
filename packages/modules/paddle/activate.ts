import { buildResponse } from '@as/shared'

/**
 * Paddle activation
 * @url https://v3.paddleapi.com/3.2/license/activate
 */
export function paddleActivate() {
  const body = $request.body
  console.log(body)
  if (!body) {
    buildResponse({
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
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
    headers: {
      'Content-Type': 'application/json',
    },
    // B7EE3D3C-B7EE3D3C-B7EE3D3C-B7EE3D3C-B7EE3D3C
    body: {
      success: true,
      response: {
        product_id,
        activation_id: 'QiuChenly',
        type: 'activate',
        expires: 1,
        expiry_date: 1999999999999,
      },
    },
  })
}
