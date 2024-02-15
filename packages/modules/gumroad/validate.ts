import { buildResponse } from "../../shared/src/utils";
import { parseURLParams } from "../../shared/src/utils/url";

/**
 * @url https://api.gumroad.com/v2/licenses/verify
 */
export function GumroadValidate() {
  const url = $request.url
  const params = parseURLParams(url)
  const body = {
    success: true,
    uses: -999,
    purchase: {
      sellerId: "123",
      productId: params.product_permalink,
      productName: params.product_permalink,
      permalink: params.product_permalink,
      productPermalink: params.product_permalink,
      email: "qiuchenly@outlook.com",
      price: 100,
      gumroadFee: 0,
      currency: "usd",
      quantity: 1,
      discoverFeeCharged: false,
      canContact: false,
      referrer: "none",
      orderNumber: 1234,
      saleId: "1",
      saleTimestamp: "2099-07-16T19:00:00Z",
      licenseKey: params.license_key,
      refunded: false,
      disputed: false,
      disputeWon: false,
      id: "1234",
      createdAt: "2023-07-16T19:00:00Z",
    },
  }

  return buildResponse({
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body
  })
}