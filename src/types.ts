type ActivatorObjFunc =
  | {
      base: string;
      func: ActivatorFunction;
    }
  | ActivatorFunction;
export interface Activator {
  [key: string]: {
    base: string;
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
  response: Record<string, any>,
  data: string
) => any;

export type IHttpClient = {
  [x in "get" | "put" | "delete" | "head" | "options" | "patch" | "post"]: (
    props: IHttpClientProps,
    callback: IHttpClientCallback
  ) => void;
};
