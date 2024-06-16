import type { Activator } from '@as/shared'
import { GumroadValidate } from './gumroad/validate'
import { lemonSqueezyActive } from './lemon-squeezy/activate'
import { lemonsqueezyValidate } from './lemon-squeezy/validate'
import { paddleActivate } from './paddle/activate'
import { paddleVerify } from './paddle/validate'
import { DashboardModuleRouter } from './dashboard/custom/router'
import { iTunesVerifyReceipt } from './itunes/custom'
import { shottrVerifyLicense } from './shottr/validate'
import { shottrTelemetry } from './shottr/custom/telemetry'
import { raycastActivate } from './raycast/activate'
import { unblockRequest } from './raycast/universal'
import { raycastTrialStatus } from './raycast/customs/custom'
import { raycastTranslate } from './raycast/customs/translate'
import { lemonSqueezyDeactivate } from './lemon-squeezy/deactivate'
import { locafeNotchNook } from './locafe/notchnook/verify'
import { kerLigActivate } from './kerlig/activate'

// import { cleanshotUser } from './cleanshot/customs/user'

export const activator: Activator = {
  dashboard: {
    base: 'http://as.as',
    customs: DashboardModuleRouter,
  },
  lemonSqueezy: {
    base: 'https://api.lemonsqueezy.com/v1/licenses',
    activate: lemonSqueezyActive,
    validate: lemonsqueezyValidate,
    customs: [
      {
        base: 'deactivate',
        func: lemonSqueezyDeactivate,
      },
    ],
  },
  paddle: {
    base: 'https://v3.paddleapi.com/3.2/license',
    activate: paddleActivate,
    validate: {
      base: 'verify',
      func: paddleVerify,
    },
  },
  gumroad: {
    base: 'https://api.gumroad.com/v2/licenses',
    validate: {
      base: 'verify',
      func: GumroadValidate,
    },
  },
  itunes: {
    base: 'https://buy.itunes.apple.com',
    customs: [
      {
        base: 'verifyReceipt',
        func: iTunesVerifyReceipt,
      },
    ],
  },
  raycast: {
    base: 'https://backend.raycast.com/api/v1',
    activate: {
      base: 'me',
      func: raycastActivate,
      type: 'http-response',
    },
    customs: [
      {
        base: 'translations',
        func: raycastTranslate,
      },
      {
        base: 'me/trial_status',
        func: raycastTrialStatus,
      },
      {
        base: 'me/sync',
        func: unblockRequest,
      },
      {
        base: 'ai/models',
        func: unblockRequest,
      },
      {
        base: 'ai/chat_completions',
        func: unblockRequest,
      },
    ],
  },
  shottr: {
    base: [
      'https://shottr.cc',
    ],
    validate: {
      base: 'licensing/verify.php',
      func: shottrVerifyLicense,
    },
    customs: [
      {
        base: 'api/telemetry.php',
        func: shottrTelemetry,
      },
    ],
  },
  locafe: {
    base: 'https://lo.cafe/api',
    customs: [
      {
        base: 'notchnook-verify-key',
        func: locafeNotchNook,
      },
    ],
  },
  kerlig: {
    base: 'https://b.kerlig.local/api/v1',
    customs: [
      {
        base: 'license',
        func: kerLigActivate,
      },
    ],
  },
  // cleanshot: {
  //   base: 'https://api.cleanshot.cloud/v1',
  //   customs: [
  //     {
  //       base: 'user',
  //       func: cleanshotUser,
  //     },
  //   ],
  // },
}
