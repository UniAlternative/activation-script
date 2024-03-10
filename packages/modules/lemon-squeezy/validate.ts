import { ResponseDone } from '@as/shared'

export function lemonsqueezyValidate() {
  return ResponseDone({
    body: {
      valid: true,
      error: null,
    },
  })
}
