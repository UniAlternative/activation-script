/**
 * @reference https://github.com/ifyour/deeplx/blob/main/src/query.ts
 */

import { ResponseDone, destr, httpClient } from '@as/shared'

function countLetterI(translateText: string) {
  return (translateText || '').split('i').length - 1
}

function getTimestamp(letterCount: number) {
  const timestamp = new Date().getTime()
  return letterCount !== 0
    ? timestamp - (timestamp % (letterCount + 1)) + (letterCount + 1)
    : timestamp
}

export async function raycastTranslate() {
  const endpoint = 'https://www2.deepl.com/jsonrpc'

  const body = destr<{
    source: string
    q: string
    target: string
    format: 'text'
  }>($request.body)

  const query = {
    text: body.q,
    source_lang: body.source || 'auto',
    target_lang: body.target,
  }

  const requestParams = {
    jsonrpc: '2.0',
    method: 'LMT_handle_texts',
    id: Math.floor(Math.random() * 100000 + 100000) * 1000,
    params: {
      texts: [{ text: '', requestAlternatives: 3 }],
      timestamp: 0,
      splitting: 'newlines',
      lang: {
        source_lang_user_selected: query.source_lang.toUpperCase(),
        target_lang: query.target_lang?.toUpperCase(),
      },
    },
  }

  requestParams.params.texts = [
    {
      text: query.text,
      requestAlternatives: 3,
    },
  ]
  requestParams.params.timestamp = getTimestamp(countLetterI(query.text))

  let requestBody = JSON.stringify(requestParams)

  if (
    [0, 3].includes((requestParams.id + 5) % 29)
    || (requestParams.id + 3) % 13 === 0
  ) {
    requestBody = requestBody.replace('"method":"', '"method" : "')
  }
  else {
    requestBody = requestBody.replace('"method":"', '"method": "')
  }

  const translateResponse = await httpClient.post({
    url: endpoint,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: requestBody,
  }).then((res) => {
    const data = destr<{
      result: {
        texts: {
          text: string
          alternatives: {
            text: string
          }[]
        }[]
        lang: string
      }
    }>(res.data)
    const { result } = data
    return {
      code: 200,
      message: 'success',
      data: result?.texts?.[0]?.text,
      source_lang: query?.source_lang || result?.lang || 'auto',
      target_lang: query?.target_lang || 'en',
      alternatives: result.texts?.[0]?.alternatives?.map?.((item: { text: any }) => item.text),
    }
  }).catch((e) => {
    return {
      code: 500,
      data: null,
      message: e,
    }
  })

  return ResponseDone({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: {
      data: {
        translations: [
          {
            translatedText: translateResponse.data || '',
          },
        ],
      },
    },
  })
}
