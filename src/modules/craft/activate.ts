import { buildResponse } from "../../utils";

export function craftActivate() {
  const body = $request.body;
  const originalBody = JSON.parse(body || "{}");

  const _body: {
    tier: string;
    subscriptionActive: boolean;
    expirationDate: number;
    rawSubscriptionType: string;
    productId: string;
    subscription: boolean;
  } = {} as any;

  _body["tier"] = "pro";
  _body["subscriptionActive"] = true;
  _body["expirationDate"] = 1043198395504;
  _body["rawSubscriptionType"] = "yearly";
  _body["productId"] = "com.lukilabs.lukiapp.pro.sub.yearly";
  _body["subscription"] = true;

  originalBody["subscription"] = _body;
  buildResponse({
    body: originalBody,
  });
  
}