import { buildResponse, httpClient, sendNotification } from "../../utils";

/**
 * @url https://backend.raycast.com/api/v1/me
 */
export function raycastActivate() {
  httpClient.get({
    url: $request.url,
    headers: $request.headers
  }, (err, response, _data) => {
    if (!_data) {
      console.log("raycastActivate: _data is null", err);
      buildResponse({
        status: 500,
        body: {}
      })
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

    buildResponse({
      headers: response.headers,
      body: data
    })
  })
}
