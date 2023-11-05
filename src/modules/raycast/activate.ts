import { buildResponse, sendNotification } from "../../utils";

/**
 * @url https://backend.raycast.com/api/v1/me
 */
export function raycastActivate() {
  const body = $request.body || "{}";
  const data = JSON.parse(body);
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
    header: $request.headers,
    body: data
  })
}
