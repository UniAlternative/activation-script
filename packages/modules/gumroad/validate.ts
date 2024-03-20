import { ResponseDone, fakeEmail, fakeUrl, parseURLParams, v4 } from '@as/shared'

/**
 * @url https://api.gumroad.com/v2/licenses/verify
 */
export function GumroadValidate() {
  console.log($request)
  const url = $request.url
  const _body = $request.body
  let params = parseURLParams(url)

  // 如果 params 里面没有东西，那就是 body 里面有东西
  if (Object.keys(params).length === 0)
    params = parseURLParams(`${$request.url}?${_body}`)

  const body = {
    success: true,
    uses: 0,
    purchase: {
      order_number: 524459935,
      id: v4(),
      seller_id: v4(),

      purchaser_id: v4(),
      subscription_id: v4(),

      product_id: unescape(params.product_id) || v4(),
      product_name: 'Gumroad\'s Product',
      permalink: params.product_permalink || 'gumroad-product',
      product_permalink: params.product_permalink || fakeUrl(),
      email: fakeEmail(),
      price: 0,
      gumroad_fee: 0,
      currency: 'usd',
      quantity: 1,
      discover_fee_charged: false,
      can_contact: false,

      referrer: 'none',

      sale_id: v4(),
      sale_timestamp: new Date().toISOString(),

      license_key: params.license_key,

      refunded: false,
      disputed: false,
      dispute_won: false,
      created_at: '2021-01-01T00:00:00Z',
    },
  }

  return ResponseDone({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body,
  })
}
