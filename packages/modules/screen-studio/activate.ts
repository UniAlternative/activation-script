import { ResponseDone } from '@as/shared'
import { generateLemonSqueezyShare, getLemonSqueezyLicenseKeyFromRequest, lemonSqueezyInstance } from '../lemon-squeezy/share'

export function screenStudioActivate() {
  const license_key = getLemonSqueezyLicenseKeyFromRequest()

  return ResponseDone({
    body: {
      result: {
        type: 'data',
        data: {
          activated: true,
          instance: lemonSqueezyInstance,
          ...generateLemonSqueezyShare(license_key),
        },
      },
    },
  })
}
