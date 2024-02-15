import { buildResponse } from "@as/shared";

export function lemonsqueezyValidate() {
  buildResponse({
    body: {
      valid: true,
      error: null,
    },
  });
}
