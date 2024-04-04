import { ResponseDone } from '@as/shared'
import { generateLemonSqueezyShare, getLemonSqueezyLicenseKeyFromRequest, lemonSqueezyInstance } from './share'

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
export function lemonSqueezyActive() {
  const license_key = getLemonSqueezyLicenseKeyFromRequest()

  return ResponseDone({
    body: {
      activated: true,
      instance: lemonSqueezyInstance,
      ...generateLemonSqueezyShare(license_key),
      error: null,
    },
  })
}
