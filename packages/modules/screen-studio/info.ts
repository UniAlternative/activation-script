import { ResponseDone } from '@as/shared'

/**
 * @url license.licenseInfo
 */
export function screenStudioLicenseInfo() {
  return ResponseDone({
    body: {
      result: {
        type: 'data',
        data: {
          email: 'luke@skywalker.com',
        },
      },
    },
  })
}
