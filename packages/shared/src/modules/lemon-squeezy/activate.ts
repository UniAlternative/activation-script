import { buildResponse } from "../../utils";

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
export function lemonSqueezyActive() {
  buildResponse({
    body: {
      activated: true,
      instance: {
        id: "wibus-wee",
      },
      error: null,
    },
  });
}
