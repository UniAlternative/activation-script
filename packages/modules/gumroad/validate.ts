import { ResponseDone, parseURLParams } from '@as/shared'

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
    uses: 1,
    purchase: {
      seller_id: '123',
      product_id: params.product_permalink,
      product_name: params.product_permalink,
      permalink: params.product_permalink,
      product_permalink: params.product_permalink,
      email: 'wibus@qq.com',
      price: 100,
      gumroad_fee: 0,
      currency: 'usd',
      quantity: 1,
      discover_fee_charged: false,
      can_contact: false,
      referrer: 'none',
      order_number: 1234,
      sale_id: '1',
      sale_timestamp: '2099-07-16T19:00:00Z',
      license_key: params.license_key,
      refunded: false,
      disputed: false,
      dispute_won: false,
      id: '1234',
      created_at: '2023-07-16T19:00:00Z',
    },
  }

  return ResponseDone({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body,
  })
}
