import { ResponseDone } from '@as/shared'
import { generateLemonSqueezyShare, getLemonSqueezyLicenseKeyFromRequest } from './share'

export function lemonSqueezyDeactivate() {
  const license_key = getLemonSqueezyLicenseKeyFromRequest()

  return ResponseDone({
    body: {
      deactivated: true,
      error: null,
      ...generateLemonSqueezyShare(license_key),
    },
  })
}
