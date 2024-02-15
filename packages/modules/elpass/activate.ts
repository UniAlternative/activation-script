import { buildResponse } from "../../shared/src/utils";

/**
 * @url https://api.elpass.app/device/activate-with-key
 */
export function elpassActivateWithKey() {
  buildResponse({
    body: {
      code: 0,
      license: "没有密钥 这个注入伪造信息是没有用的",
    },
  });
}
