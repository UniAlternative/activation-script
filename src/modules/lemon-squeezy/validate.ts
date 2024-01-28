import { buildResponse } from "../../utils";

export function lemonsqueezyValidate() {
  buildResponse({
    body: {
      valid: true,
      error: null,
    },
  });
}
