import { ResponseDone, destr, parseURL } from '@as/shared'
import { generateLemonSqueezyShare } from './share'

export function lemonSqueezyDeactivate() {
  const body = destr($request.body) as {
    license_key: string
  } | undefined
  const license_key = body?.license_key || (parseURL($request.url).params as { license_key: string }).license_key

  return ResponseDone({
    body: {
      deactivated: true,
      error: null,
      ...generateLemonSqueezyShare(license_key),
    },
  })
}
