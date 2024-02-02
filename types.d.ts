declare global {
  var $request: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: string;
    status: number;
  };
  var $done: (props?: any) => void;
  var $notification: any;
  var $httpClient: any;
  var $response: {
    headers: Record<string, string>;
    body: string;
  };
}

export { }