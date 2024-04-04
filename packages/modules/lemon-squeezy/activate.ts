import { ResponseDone, destr, parseURL } from '@as/shared'
import { generateLemonSqueezyShare } from './share'

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
export function lemonSqueezyActive() {
  const body = destr($request.body) as {
    license_key: string
  } | undefined

  const license_key = body?.license_key || (parseURL($request.url).params as { license_key: string }).license_key

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
