import { buildResponse } from "../../shared/src/utils";

export function lemonsqueezyValidate() {
  buildResponse({
    body: {
      valid: true,
      error: null,
    },
  });
}
