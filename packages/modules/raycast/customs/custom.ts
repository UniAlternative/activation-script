import { buildResponse } from "../@as/shared";
import { RAYCAST_AI_SERVICE_PROVIDERS, RAYCAST_DEFAULT_MODELS, RAYCAST_GEMINI_PRO_ONLY_MODELS } from "../constants";

/**
 * @url https://backend.raycast.com/api/v1/me/trial_status
 */
export function raycastTrialStatus() {
  const body = $request.body || "{}";
  const data = JSON.parse(body);
  data["organizations"] = [];
  data["trial_limits"] = {
    "commands_limit": 999,
    "quicklinks_limit": 999,
    "snippets_limit": 999
  };

  buildResponse({
    body: data
  })
}