import { buildResponse, modifyResponse } from "../../../../utils";
import { RAYCAST_DEFAULT_MODELS, RAYCAST_AI_SERVICE_PROVIDERS, RAYCAST_GEMINI_PRO_ONLY_MODELS } from "../../constants";

/**
 * @url https://backend.raycast.com/api/v1/ai/models
 */
export function raycastAiModels() {
  let data = JSON.parse($response.body);
  let default_models;
  switch (config.ai.type) {
    case "openai":
      default_models = RAYCAST_DEFAULT_MODELS;
      break;
    case "gemini":
      default_models = RAYCAST_GEMINI_PRO_ONLY_MODELS;
      break;
    default:
      default_models = RAYCAST_DEFAULT_MODELS;
      break;
  }
  modifyResponse({
    headers: $response.headers,
    body: {
      ...data,
      default_models,
      models: RAYCAST_AI_SERVICE_PROVIDERS,
    }
  })
}