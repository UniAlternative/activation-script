import { destr, parseURL } from '@as/shared'

// LicenseKey -> ProductID mapping
export const licenseKeyToProductID: Record<string, number> = {
  // Alist Desktop
  '401934ec-0a54-433c-a299-2a363501d4be': 154474,
  // LookAway
  'f3c67e87-8e95-474d-ace6-5bf28b86dd97': 121974,
  'ca3120ca-f2f7-4d8b-89ec-76effe34431b': 221204, // 172179
}

export const licenseKeyToStoreID: Record<string, number> = {
  // Studio Studio -- qee=9273
  '64fd88be-79c0-4167-8078-680ddef8cbc5': 9273,
}

export const lemonSqueezyInstance = {
  id: '47596ad9-a811-4ebf-ac8a-03fc7b6d2a17',
  name: 'Wibus Wee',
  created_at: new Date().toISOString(),
}

export function generateLemonSqueezyShare(licenseKey: string) {
  const product_id = licenseKeyToProductID[licenseKey] || 0
  const store_id = licenseKeyToStoreID[licenseKey] || 1
  return {
    license_key: {
      id: 1,
      status: 'active',
      key: licenseKey,
      activation_limit: 1,
      activation_usage: 0,
      created_at: new Date().toISOString(),
      expires_at: null,
    },
    meta: {
      store_id,
      order_id: 2,
      order_item_id: 3,
      variant_id: 5,
      variant_name: 'Default',
      product_id,
      product_name: 'Lemon Squeezy',
      customer_id: 1,
      customer_name: 'Wibus Wee',
      customer_email: 'luke@skywalker.com',
    },
  }
}

export function getLemonSqueezyLicenseKeyFromRequest() {
  const body = destr($request.body) as {
    license_key?: string
    licenseKey?: string
  } | undefined
  // const license_key = body?.license_key || (parseURL($request.url).params as { license_key: string }).license_key
  const license_key = body?.license_key
    || body?.licenseKey
    || (parseURL($request.url).params as { license_key?: string, licenseKey?: string }).license_key
    || (parseURL($request.url).params as { license_key?: string, licenseKey?: string }).licenseKey
    || (parseURL($request.url).params as { input: { licenseKey?: string } }).input?.licenseKey
  console.log(`[lemon-squeezy] license_key: ${license_key}`)
  return license_key || ''
}
