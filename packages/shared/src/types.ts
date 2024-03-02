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

type ActivatorFunction = () => Record<string, any>

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

export type IHttpClient = {
  [x in 'get' | 'put' | 'delete' | 'head' | 'options' | 'patch' | 'post']: (
    props: IHttpClientProps,
    callback: IHttpClientCallback
  ) => void;
}

type AIType = 'openai' | 'custom' | 'gemini'
export interface AIConfig {
  type: AIType | AIType[]
  openAIKey?: string
  geminiKey?: string
  endpoint?: string
}
