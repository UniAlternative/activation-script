export function lemonsqueezyValidate($request: any, $done: any) {
  const url = $request.url;
  if (url !== "https://api.lemonsqueezy.com/v1/licenses/validate") return;
}