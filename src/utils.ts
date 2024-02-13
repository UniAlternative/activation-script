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
 * @description Surge 会直接返回 HTTP 响应，而不进行真实的网络操作
 */
export function buildResponse(props: {
  headers?: Record<string, string>;
  body?: Record<string, any> | string;
  status?: number;
}) {
  if (props.body) {
    props.body = transformToString(props.body);
  }
  $done(props);
}

export function modifyRequest(props: {
  url: string;
  headers: Record<string, string>;
  body?: Record<string, any> | string;
  response?: {
    status?: number;
    headers?: Record<string, string>;
    body?: Record<string, string> | string;
  };
}) {
  if (props.body) {
    props.body = transformToString(props.body);
  }
  if (props.response?.body) {
    props.response.body = transformToString(props.response.body);
  }
  $done({
    ...props,
  });
}
export function modifyResponse(props: {
  status?: number;
  headers?: Record<string, string>;
  body?: string;
}) {
  if (props.body) {
    props.body = transformToString(props.body);
  }
  $done({
    ...props,
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
  };
}

export function parseURLParams(url: string) {
  // 获取 URL 中 ? 后面的查询参数部分
  const queryString = url.split('?')[1];
  if (!queryString) {
      return {};
  }

  // 将查询参数字符串拆分成键值对数组
  const keyValuePairs = queryString.split('&');

  // 创建一个对象来存储解析后的参数
  const params: Record<string, string> = {};

  // 遍历键值对数组，将每个参数解析成对象的属性
  keyValuePairs.forEach(function(keyValuePair: string) {
      // 将键值对拆分成键和值
      const pair = keyValuePair.split('=');
      // 解码键和值，并存储到 params 对象中
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  });

  return params;
}