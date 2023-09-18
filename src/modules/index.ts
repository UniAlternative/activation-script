import { Activator } from "../types";
import { craftActivate } from "./craft/activate";
import { elpassActivateWithKey } from "./elpass/activate";
import { elpassInit, elpassManagement } from "./elpass/custom";
import { lemonSqueezyActive } from "./lemon-squeezy/activate";
import { lemonsqueezyValidate } from "./lemon-squeezy/validate";
import { paddleActivate } from "./paddle/activate";
import { paddleVerify } from "./paddle/validate";
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
  craft: {
    base: "https://api.craft.do/auth/v3",
    activate: {
      base: "profile",
      func: craftActivate,
    },
  },
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
  /**
   * TODO: Spotify. 
    Because of the problem of the main function, 
    it could not verify the Array type,
    and Activator type also needs to be modified to support Array type.
   */
  // spotify: {
  //   base: [
  //     "https://audio-ak-spotify-com.akamaized.net",
  //     "https://audio-akp-quic-spotify-com.akamaized.net",
  //     "https://audio-fa.scdn.co",
  //     "https://creativeservice-production.scdn.co",
  //   ],
  //   customs: [
  //     {
  //       base: "*",
  //       func: spotifyRemoveAds,
  //     },
  //   ]
  // }
};
