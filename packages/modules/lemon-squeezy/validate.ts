import { ResponseDone } from '@as/shared'
import { generateLemonSqueezyShare, getLemonSqueezyLicenseKeyFromRequest, lemonSqueezyInstance } from './share'

export function lemonsqueezyValidate() {
  const license_key = getLemonSqueezyLicenseKeyFromRequest()

  return ResponseDone({
    body: {
      valid: true,
      error: null,
      instance: lemonSqueezyInstance,
      ...generateLemonSqueezyShare(license_key),
    },
  })
}
