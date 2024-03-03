export interface ActivatorObjFunc {
  base: string
  func: ActivatorFunction
  type?: 'http-request' | 'http-response'
}

export interface Activator {
  [key: string]: {
    base: string | string[]
    activate?: ActivatorObjFunc | ActivatorFunction
    validate?: ActivatorObjFunc | ActivatorFunction
    customs?: Array<ActivatorObjFunc | ActivatorFunction>
  }
}

type ActivatorFunction = Function | (() => Promise<any>)

export interface IHttpClientProps {
  url: string
  headers?: Record<string, string>
  body?: Record<string, string> | string
}

export type IHttpClientCallback = (
  error: string,
  response: {
    status: number
    headers: Record<string, string>
  },
  data: string
) => any

export type ICallbackHttpClient = {
  [x in 'get' | 'put' | 'delete' | 'head' | 'options' | 'patch' | 'post']: (
    props: IHttpClientProps,
    callback: IHttpClientCallback
  ) => void;
}

export type IHttpClient = {
  [x in 'get' | 'put' | 'delete' | 'head' | 'options' | 'patch' | 'post']: (
    props: IHttpClientProps
  ) => Promise<{
    status: number
    headers: Record<string, string>
    data: string
  }>;
}

type AIType = 'openai' | 'custom' | 'gemini'
export interface AIConfig {
  type: AIType | AIType[]
  openAIKey?: string
  geminiKey?: string
  endpoint?: string
}
