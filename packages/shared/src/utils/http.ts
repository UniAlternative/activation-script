import type { ICallbackHttpClient, IHttpClient, IHttpClientCallback, IHttpClientProps } from '../types'

const methods = ['get', 'put', 'delete', 'head', 'options', 'patch', 'post']

/**
 * 发送请求
 * @param props 请求参数
 * @param callback 回调函数
 */
export const callBackHttpClient: ICallbackHttpClient = {} as any
for (const method of methods) {
  // @ts-expect-error 这个地方无法通过类型检查
  callBackHttpClient[method] = (
    props: IHttpClientProps,
    callback: IHttpClientCallback,
  ) => {
    $httpClient[method](props, callback)
  }
}

export const httpClient: IHttpClient = {} as IHttpClient
for (const method of methods) {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  httpClient[method] = (props: IHttpClientProps) => {
    return new Promise((resolve, reject) => {
      // @ts-expect-error 不想做类型检查...
      callBackHttpClient[method](props, (error, response, data) => {
        if (error) {
          reject(error)
        }
        else {
          resolve({
            status: response.status,
            headers: response.headers,
            data,
          })
        }
      })
    })
  }
}
