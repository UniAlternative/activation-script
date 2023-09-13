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
