import { buildResponse } from "../../utils";

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
