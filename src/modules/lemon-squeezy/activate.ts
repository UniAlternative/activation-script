import { buildResponse } from "../../utils";

export function lemonSqueezyActive($request: any, $done: any) {
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
