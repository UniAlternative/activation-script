import { transformToString } from './object'

export * from './object'
export * from './destr'
export * from './url'
export * from './uuid'
export * from './http'
export * from './base64'

/**
 * 构建 Surge 响应体
 *
 * @param props 响应体属性
 * @param props.headers 响应头
 * @param props.body 响应体
 * @param props.status 响应状态码w
 * @description Surge 会直接返回 HTTP 响应，而不进行真实的网络操作
 */
export function ResponseDone(props: {
  headers?: Record<string, string>
  body?: Record<string, any> | string
  status?: number
}) {
  if (props.body)
    props.body = transformToString(props.body)

  return {
    response: {
      ...props,
    },
  }
}

export function Done(props: {
  url?: string
  headers?: Record<string, any>
  body?: Record<string, any> | string
  response?: {
    status?: number
    headers?: Record<string, string>
    body?: Record<string, string> | string
  }
}) {
  if (props.body)
    props.body = transformToString(props.body)

  if (props.response?.body)
    props.response.body = transformToString(props.response.body)

  return {
    ...props,
  }
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
  title = transformToString(title)
  subtitle = transformToString(subtitle)
  body = transformToString(body)
  $notification.post(title, subtitle, body)
}
