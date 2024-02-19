import type { Activator } from '@as/shared'
import { GumroadValidate } from './gumroad/validate'
import { lemonSqueezyActive } from './lemon-squeezy/activate'
import { lemonsqueezyValidate } from './lemon-squeezy/validate'
import { paddleActivate } from './paddle/activate'
import { paddleVerify } from './paddle/validate'

// import { raycastActivate } from "./raycast/activate";
// import { raycastAICompletionsRequest } from "./raycast/customs/ai/completions";
// import { raycastAiModels } from "./raycast/customs/ai/models";
// import { raycastTrialStatus } from "./raycast/customs/custom";
import { spotifyRemoveAds } from './spotify/custom'

export const activator: Activator = {
  lemonSqueezy: {
    base: 'https://api.lemonsqueezy.com/v1/licenses',
    activate: lemonSqueezyActive,
    validate: lemonsqueezyValidate,
  },
  paddle: {
    base: 'https://v3.paddleapi.com/3.2/license',
    activate: paddleActivate,
    validate: {
      base: 'verify',
      func: paddleVerify,
    },
  },
  spotify: {
    base: [
      // "https://audio-ak-spotify-com.akamaized.net", // 这个好像是真正的音乐获取地址...
      'https://audio-akp-quic-spotify-com.akamaized.net',
      'https://audio-fa.scdn.co',
      'https://creativeservice-production.scdn.co',
      'https://audio4-fa.scdn.co',
    ],
    customs: [
      {
        base: '*',
        func: spotifyRemoveAds,
      },
    ],
  },
  gumroad: {
    base: 'https://api.gumroad.com/v2/licenses',
    validate: {
      base: 'verify',
      func: GumroadValidate,
    },
  },
  // typora: {
  //   base: 'https://dian.typora.com.cn/api/client',
  //   activate: TyporaActivate,
  // },
  raycast: {
    base: 'https://backend.raycast.com/api/v1',
    // activate: {
    //   base: "me",
    //   func: raycastActivate,
    //   type: "http-response",
    // },
    activate: {
      base: '*',
      func: () => {
        if ($request.headers['x-raycast-unblock']) {
          console.log('Raycast Unblock request')
          $done({
            headers: {
              ...$request.headers,
              'x-raycast-unblock': undefined,
            },
          })
          return
        }
        $done({
          url: $request.url.replace(
            'https://backend.raycast.com',
            'http://127.0.0.1:3000',
          ),
          headers: $request.headers,
          body: $request.body,
        })
      },
    },
    customs: [
      // {
      //   base: "me/trial_status",
      //   func: raycastTrialStatus,
      // },
      // {
      //   base: "ai/models",
      //   func: raycastAiModels,
      //   type: "http-response"
      // },
      // {
      //   base: "ai/chat_completions",
      //   func: raycastAICompletionsRequest,
      // },
    ],
  },
}
