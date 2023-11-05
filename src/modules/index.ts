import { Activator } from "../types";
import { craftActivate } from "./craft/activate";
import { elpassActivateWithKey } from "./elpass/activate";
import { elpassInit, elpassManagement } from "./elpass/custom";
import { lemonSqueezyActive } from "./lemon-squeezy/activate";
import { lemonsqueezyValidate } from "./lemon-squeezy/validate";
import { paddleActivate } from "./paddle/activate";
import { paddleVerify } from "./paddle/validate";
import { raycastActivate } from "./raycast/activate";
import { raycastTrialStatus } from "./raycast/custom";
import { spotifyRemoveAds } from "./spotify/custom";

export const activator: Activator = {
  lemonSqueezy: {
    base: "https://api.lemonsqueezy.com/v1/licenses",
    activate: lemonSqueezyActive,
    validate: lemonsqueezyValidate,
  },
  paddle: {
    base: "https://v3.paddleapi.com/3.2/license",
    activate: paddleActivate,
    validate: {
      base: "verify",
      func: paddleVerify,
    },
  },
  // craft: {
  //   base: "https://api.craft.do/auth/v3",
  //   activate: {
  //     base: "profile",
  //     func: craftActivate,
  //   },
  // },
  elpass: {
    base: "https://api.elpass.app/device",
    activate: {
      base: "activate-with-key",
      func: elpassActivateWithKey,
    },
    customs: [
      {
        base: "management",
        func: elpassManagement,
      },
      {
        base: "init",
        func: elpassInit,
      },
    ],
  },
  spotify: {
    base: [
      // "https://audio-ak-spotify-com.akamaized.net", // 这个好像是真正的音乐获取地址...
      "https://audio-akp-quic-spotify-com.akamaized.net",
      "https://audio-fa.scdn.co",
      "https://creativeservice-production.scdn.co",
      "https://audio4-fa.scdn.co"
    ],
    customs: [
      {
        base: "*",
        func: spotifyRemoveAds,
      },
    ]
  },
  raycast: {
    base: "https://backend.raycast.com/api/v1",
    activate: {
      base: "me",
      func: raycastActivate,
    },
    customs: [
      {
        base: "me/trial_status",
        func: raycastTrialStatus,
      }
    ]
  }
};
