import { buildResponse, httpClient, sendNotification } from "../../utils";

/**
 * @url https://backend.raycast.com/api/v1/me
 */
export function raycastActivate() {
  // activeWithReRequest();
  activeWithResponse();
}

function activeWithResponse() {
  // sendNotification("Raycast", "Activate Inject", "Catched - Response Pattern");
  let body = JSON.parse($response.body);
  console.log("raycastActivate: body", body);
  buildResponse({
    headers: {
      ...$response.headers
    },
    body: {
      ...body,
      eligible_for_pro_features: true,
      has_active_subscription: true,
      eligible_for_ai: true,
      eligible_for_gpt4: true,
      eligible_for_ai_citations: true,
      eligible_for_developer_hub: true,
      eligible_for_application_settings: true,
      // publishing_bot: true,
      has_pro_features: true,
      has_better_ai: true,
      can_upgrade_to_pro: false,
      admin: true,
      // name: "MITM YOU!",
    }
  })
  // sendNotification("Raycast", "Activate Success", "Done");
}

function activeWithReRequest() {
  // sendNotification("Raycast", "Activate Inject", "Catched - ReRequest Pattern");
  httpClient.get(
    {
      url: $request.url,
      headers: $request.headers,
    },
    (err, response, _data) => {
      if (!_data) {
        console.log("raycastActivate: _data is null", err);
        buildResponse({
          status: 500,
          body: {},
        });
      }
      const data = JSON.parse(_data);
      data["eligible_for_pro_features"] = true;
      data["has_active_subscription"] = true;
      data["eligible_for_ai"] = true;
      data["eligible_for_gpt4"] = true;
      data["eligible_for_ai_citations"] = true;
      data["eligible_for_developer_hub"] = true;
      data["eligible_for_application_settings"] = true;
      data["publishing_bot"] = true;
      data["has_pro_features"] = true;
      data["has_better_ai"] = true;
      data["can_upgrade_to_pro"] = false;
      data["admin"] = true;
      // data["username"] = "MITM YOU!";

      buildResponse({
        headers: response.headers,
        body: data,
      });
      // sendNotification("Raycast", "Activate Success", "Done");
    }
  );
}
