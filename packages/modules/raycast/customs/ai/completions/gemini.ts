import { ResponseDone, httpClient } from '@as/shared'
import { GEMINI_OFFICIAL_ENDPOINT } from '../../../constants'

/**
 * @url https://backend.raycast.com/api/v1/ai/completions
 * @description For Gemini
 */
export function raycastAICompletionsWithGemini() {
  let body = JSON.parse($request.body)
  body = {
    ...body,
    // stream: false,
  }
  const endpoint = config.ai.endpoint || GEMINI_OFFICIAL_ENDPOINT
  $request.url = `${endpoint}?key=${config.ai.geminiKey}`
  let google_message = ''
  body.messages.forEach((message: { [x: string]: { [x: string]: any } }) => {
    if ('system_instructions' in message.content)
      google_message += `${message.content.system_instructions}\n`

    if ('command_instructions' in message.content)
      google_message += `${message.content.command_instructions}\n`

    if ('additional_system_instructions' in body)
      google_message += `${body.additional_system_instructions}\n`

    if ('text' in message.content)
      google_message += `${message.content.text}\n`

    if ('temperature' in message.content)
      body.temperature = message.content.temperature
  })
  body = {
    contents: [
      {
        parts: [
          {
            text: google_message,
          },
        ],
      },
    ],
  }
  body = JSON.stringify(body)
  console.log('[Gemini] Request Body: ', body)
  httpClient.post(
    {
      url: $request.url,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    (error, _, data) => {
      let res = {}
      const dataJson = JSON.parse(data)
      if (dataJson.error || error) {
        res = {
          body: {
            // data: {
            text: '',
            finish_reason: dataJson.error ? dataJson.error.message : error,
            // }
          },
          status: dataJson.error ? dataJson.error.code : 500,
        }
      }
      else {
        const model_output = dataJson.candidates[0].content.parts[0].text
        res = {
          body: {
            // data: {
            text: model_output,
            // }
          },
        }
      }
      return ResponseDone(res)
    },
  )
}
