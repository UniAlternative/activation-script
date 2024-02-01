import { raycastAICompletionsWithGemini } from "./gemini";
import { raycastAICompletionsWithOpenAI } from "./openai";

export function raycastAICompletionsRequest() {
  switch (config.ai.type) {
    case "openai":
      return raycastAICompletionsWithOpenAI();
    case "gemini":
      return raycastAICompletionsWithGemini();
    default:
      return raycastAICompletionsWithOpenAI();
  }
}

// export function raycastAICompletionsResponse() {
//   switch (config.ai.type) {
//     case "openai":
//       return raycastAICompletionsWithOpenAI();
//     case "gemini":
//       return raycastAICompletionsRequestWithGemini();
//     default:
//       return raycastAICompletionsWithOpenAI();
//   }
// }
