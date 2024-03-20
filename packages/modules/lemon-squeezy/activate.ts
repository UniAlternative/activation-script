import { ResponseDone, destr, parseURL } from '@as/shared'

// LicenseKey -> ProductID mapping
const licenseKeyToProductID: Record<string, number> = {
  '401934ec-0a54-433c-a299-2a363501d4be': 154474,
  'ca3120ca-f2f7-4d8b-89ec-76effe34431b': 172179,
}

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
export function lemonSqueezyActive() {
  let product_id = 0
  const body = destr($request.body) as {
    license_key: string
  } | undefined

  const license_key = body?.license_key || (parseURL($request.url).params as { license_key: string }).license_key

  // LicenseKey -> ProductID mapping
  product_id = licenseKeyToProductID[license_key] || 0

  return ResponseDone({
    body: {
      activated: true,
      license_key: {
        id: 1,
        status: 'active',
        key: license_key,
        activation_limit: 1,
        activation_usage: 0,
        created_at: new Date().toISOString(),
        expires_at: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toISOString(),
      },
      instance: {
        id: 'f90ec370-fd83-46a5-8bbd-44a241e78665',
        name: 'Wibus Wee',
        created_at: new Date().toISOString(),
      },
      meta: {
        product_id,
        product_name: 'Lemon Squeezy',
        customer_id: 1,
        customer_name: 'Wibus Wee',
        customer_email: 'luke@skywalker.com',
      },
      error: null,
    },
  })
}
