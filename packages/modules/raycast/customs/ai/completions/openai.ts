import { buildResponse } from "../../../@as/shared";
import { OPENAI_OFFICIAL_ENDPOINT } from "../../../constants";

/**
 * @url https://backend.raycast.com/api/v1/ai/completions
 * @description For OpenAI API
 */
export function raycastAICompletionsWithOpenAI() {
  let body = JSON.parse($request.body);
  body = {
    ...body,
    stream: false,
  };
  $request.url = config.ai.endpoint || OPENAI_OFFICIAL_ENDPOINT;
  $request.headers["Authorization"] = `Bearer ${config.ai.openAIKey}`;
  body = {
    ...body,
    messages: body["messages"]
      .map((message: { [x: string]: { [x: string]: any } }) => {
        let newMessage = {};
        if ("system_instructions" in message["content"]) {
          newMessage = {
            role: "system",
            content: message["content"]["system_instructions"],
          };
        } else if ("command_instructions" in message["content"]) {
          newMessage = {
            role: "system",
            content: message["content"]["command_instructions"],
          };
        } else if ("text" in message["content"]) {
          newMessage = {
            role: "user",
            content: message["content"]["text"],
          };
        }
        return newMessage;
      })
      .concat(
        "additional_system_instructions" in body
          ? [
              {
                role: "system",
                content: body["additional_system_instructions"],
              },
            ]
          : []
      ),
  };
  body = JSON.stringify(body);

  $done({
    url: $request.url,
    headers: {},
    body
});
}
