export interface Activator {
  [key: string]: {
    base: string;
    activate?:
      | {
          base: string;
          func: ActivatorFunction
        }
      | ActivatorFunction
    validate?:
      | {
          base: string;
          func: ActivatorFunction
        }
      | ActivatorFunction
  };
}

export interface ActivatorFunc {
  ($request: any, $done: any): void;
}
type ActivatorFunction = ($request: any, $done: any) => void;
