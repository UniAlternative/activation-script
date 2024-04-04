import { ResponseDone, destr, parseURL } from '@as/shared'
import { generateLemonSqueezyShare, getLemonSqueezyLicenseKeyFromRequest } from './share'

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
export function lemonSqueezyActive() {
  const license_key = getLemonSqueezyLicenseKeyFromRequest()

  return ResponseDone({
    body: {
      activated: true,
      instance: {
        id: '47596ad9-a811-4ebf-ac8a-03fc7b6d2a17',
        name: 'Wibus Wee',
        created_at: new Date().toISOString(),
      },
      ...generateLemonSqueezyShare(license_key),
      error: null,
    },
  })
}
