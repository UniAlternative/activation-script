import { IHttpClient, IHttpClientCallback, IHttpClientProps } from "./types";

function transformToString(obj: any) {
  if (typeof obj === "object") {
    return JSON.stringify(obj);
  }
  return obj;
}

/**
 * 构建 Surge 响应体
 *
 * @param props 响应体属性
 * @description 该函数将会自动将对象转换为 JSON 字符串，因此你可以直接传入对象
 */
export function buildResponse(props: { [x: string]: any; body?: any }) {
  for (let i in props) {
    props[i] = transformToString(props[i]);
  }
  $done({
    response: {
      ...props,
    },
  });
}

/**
 * 发送通知
 *
 * @param title 标题
 * @param subtitle 副标题
 * @param body 内容
 * @description 该函数将会自动将对象转换为 JSON 字符串，因此你可以直接传入对象
 */
export function sendNotification(title: any, subtitle: any, body: any) {
  title = transformToString(title);
  subtitle = transformToString(subtitle);
  body = transformToString(body);
  $notification.post(title, subtitle, body);
}

const methods = ["get", "put", "delete", "head", "options", "patch", "post"];

/**
 * 发送请求
 * @param props 请求参数
 * @param callback 回调函数
 */
export const httpClient: IHttpClient = {} as any;
for (let method of methods) {
  // @ts-ignore
  httpClient[method] = (
    props: IHttpClientProps,
    callback: IHttpClientCallback
  ) => {
    $httpClient[method](props, callback);
  }
}
