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
  var $persistentStore: {
  /**
   * @description 持久化保存数据，返回 bool 值表示是否成功，仅支持传入 string
   */
    write: (data: string, key?: string) => boolean;
  /**
   * @description 读取保存的持久化数据，返回 string 或 Null 不传入 key 时，同一个 script-path 的脚本共享一个存储池。可传入一个固定的 key 以在多个脚本间共享数据。
   */
    read: (key?: string) => string;
  }
  var $script: {
    name: string;
  }
  var config: {
    ai: AIConfig;
  }
}

export { }