// LicenseKey -> ProductID mapping
const licenseKeyToProductID: Record<string, number> = {
  // Alist Desktop
  '401934ec-0a54-433c-a299-2a363501d4be': 154474,
  // LookAway
  'f3c67e87-8e95-474d-ace6-5bf28b86dd97': 121974,
  'ca3120ca-f2f7-4d8b-89ec-76effe34431b': 221204, // 172179
}

export function generateLemonSqueezyShare(licenseKey: string) {
  const product_id = licenseKeyToProductID[licenseKey] || 0
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
      store_id: 1,
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
