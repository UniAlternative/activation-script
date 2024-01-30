import { AIConfig } from "./src/types";

declare global {
  var $request: {
    url: string;
    method: string;
    headers: any;
    body: string;
  };
  var $done: (props?: any) => void;
  var $notification: any;
  var $httpClient: any;
  var $response: {
    headers: any;
    body: string;
  };
  var config: {
    ai: AIConfig;
  }
}

export { }