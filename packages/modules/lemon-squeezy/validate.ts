import { ResponseDone, destr, parseURL } from '@as/shared'
import { generateLemonSqueezyShare, getLemonSqueezyLicenseKeyFromRequest } from './share'

export function lemonsqueezyValidate() {
  const license_key = getLemonSqueezyLicenseKeyFromRequest()

  return ResponseDone({
    body: {
      valid: true,
      error: null,
      instance: {
        id: '47596ad9-a811-4ebf-ac8a-03fc7b6d2a17',
        name: 'Wibus Wee',
        created_at: new Date().toISOString(),
      },
      ...generateLemonSqueezyShare(license_key),
    },
  })
}
