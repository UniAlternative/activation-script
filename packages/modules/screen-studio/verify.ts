import { ResponseDone, destr, parseURL } from '@as/shared'
import { generateLemonSqueezyShare, lemonSqueezyInstance } from '../lemon-squeezy/share'

/**
 * @url https://www.screen.studio/api/trpc/license.verify?input=%7B%22licenseKey%22%3A%2264fd88be-79c0-4167-8078-680ddef8cbc5%22%2C%22instanceId%22%3A%2247596ad9-a811-4ebf-ac8a-03fc7b6d2a17%22%7D
 */
export function screenStudioVerify() {
  const license_key = destr<{
    licenseKey: string
  }>((parseURL($request.url).params as { input: string }).input).licenseKey

  return ResponseDone({
    body: {
      id: '47596ad9-a811-4ebf-ac8a-03fc7b6d2a17',
      result: {
        type: 'data',
        data: {
          valid: true,
          error: null,
          instance: lemonSqueezyInstance,
          ...generateLemonSqueezyShare(license_key),
        },
      },
    },
  })
}
