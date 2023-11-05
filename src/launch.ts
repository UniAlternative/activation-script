import { activator } from "./modules";
import { buildResponse, httpClient } from "./utils";
const url = $request.url;

/**
 * Determine whether the URL matches the base
 */
export function isMatchBase(url: string, base: string | string[]) {
  if (Array.isArray(base)) {
    for (let item of base) {
      if (url.includes(item)) {
        return true;
      }
    }
    return false;
  }
  return url.includes(base);
}

/**
 * Automatic execution of the corresponding function according to the URL
 */
export function launch() {
  for (let module in activator) {
    if (isMatchBase(url, activator[module].base)) {
      for (let key in activator[module]) {
        if (key === "base") continue;
        if (Array.isArray((activator[module] as any)[key])) {
          for (let custom of (activator[module] as any)[key]) {
            if (url === `${activator[module].base}/${custom.base}`) {
              return custom.func();
            }
          }
          continue;
        }
        if (typeof (activator[module] as any)[key] === "object") {
          if (
            url ===
            `${activator[module].base}/${(activator[module] as any)[key].base}`
          ) {
            return (activator[module] as any)[key].func();
          }
        } else if (!url.includes(`${activator[module].base}/${key}`)) {
          return;
        }
        if (typeof (activator[module] as any)[key] === "function") {
          return (activator[module] as any)[key]();
        }
      }
    }
  }
  console.log(`[activator] ${url} is not matched`);
  returnDefaultResponse();
  $done();
  return;
}

function returnDefaultResponse() {
  console.log(`[activator] returnDefaultResponse: ${url} - ${$request.method.toLowerCase()}`)
  // @ts-expect-error
  httpClient[$request.method.toLowerCase()]({
    url: $request.url,
    headers: $request.headers
  }, (err: any, response: any, _data: any) => {
    if (!_data) {
      console.log("returnDefaultResponse: _data is null", err);
      buildResponse({
        status: 500,
        body: {}
      })
    }
    buildResponse({
      status: response.status,
      headers: response.headers,
      body: _data
    })
  })
}
