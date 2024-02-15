import { buildResponse, httpClient, modifyResponse, sendNotification } from "@as/shared";

/**
 * @url https://backend.raycast.com/api/v1/me
 */
export function raycastActivate() {
  activeWithResponse();
}

function activeWithResponse() {
  // sendNotification("Raycast", "Activate Inject", "Catched - Response Pattern");
  let body = JSON.parse($response.body);
  console.log("raycastActivate: body", body);
  modifyResponse({
    headers: {
      ...$response.headers
    },
    body: {
      ...body,
      has_active_subscription: true,
      has_pro_features: true,
      has_better_ai: true,
      eligible_for_pro_features: true,
      eligible_for_ai: true,
      eligible_for_gpt4: true,
      eligible_for_ai_citations: true,
      eligible_for_developer_hub: true,
      eligible_for_application_settings: true,
      publishing_bot: true,
      can_upgrade_to_pro: false,
      admin: true,
    }
  })
  // sendNotification("Raycast", "Activate Success", "Done");
}
