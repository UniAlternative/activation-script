type ActivatorObjFunc =
  | {
      base: string;
      func: ActivatorFunction;
      type?: "http-request" | "http-response";
    }
  | ActivatorFunction;
export interface Activator {
  [key: string]: {
    base: string | string[];
    activate?: ActivatorObjFunc;
    validate?: ActivatorObjFunc;
    customs?: ActivatorObjFunc[];
  };
}

type ActivatorFunction = Function;

export interface IHttpClientProps {
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, string> | string;
}

export type IHttpClientCallback = (
  error: string,
  response: {
    status: number;
    headers: Record<string, string>;
  },
  data: string
) => any;

export type IHttpClient = {
  [x in "get" | "put" | "delete" | "head" | "options" | "patch" | "post"]: (
    props: IHttpClientProps,
    callback: IHttpClientCallback
  ) => void;
};

type AIType = "openai" | "custom" | "gemini"
export type AIConfig = {
  type: AIType | AIType[];
  openAIKey?: string;
  geminiKey?: string;
  endpoint?: string;
};