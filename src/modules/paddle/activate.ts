/**
 * Paddle activation
 * @url https://v3.paddleapi.com/3.2/license/activate
 */
export function paddleActivate($request: any, $done: any) {
  const body = $request.body;
  if (!body) {
    $done({
      response: {
        body: JSON.stringify({
          success: false,
          response: {
            error: "[Surge] Activator: No body found",
          },
        }),
      },
    });
    return;
  }
  let _body = body.split("&");
  let product_id = "";
  for (let k of _body) {
    if (k.indexOf("product_id") != -1) {
      product_id = k.split("=")[1];
    }
  }

  $done({
    response: {
      body: JSON.stringify({
        success: true,
        response: {
          product_id: product_id,
          activation_id: "QiuChenly",
          type: "personal",
          expires: 1,
          expiry_date: 1999999999999,
        },
      }),
    },
  });
}