import { activator } from "./modules";

export function buildResponse(props: { [x: string]: any; body?: any }) {
  for (let i in props) {
    if (typeof props[i] === "object") {
      props[i] = JSON.stringify(props[i]);
    }
  }
  $done({
    response: {
      ...props,
    },
  });
}