import { type Activator, ResponseDone, base64Decode } from '@as/shared'
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
import { raycastTrialStatus } from './raycast/customs/custom'
import { lemonSqueezyDeactivate } from './lemon-squeezy/deactivate'
import { kerLigActivate } from './kerlig/activate'
import { screenStudioVerify } from './screen-studio/verify'
import { screenStudioActivate } from './screen-studio/activate'
import { screenStudioLicenseInfo } from './screen-studio/info'
import { DuetValidateReceipt } from './duet/validateReceipt'
import { screenStudioAuthorizeLicenseKeyInV3, screenStudioDeactivateLicenseKeyInV3 } from './screen-studio/v3'

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
    base: [
      'https://v3.paddleapi.com/3.2/license',
      'https://api.getmedis.com/medis',
    ],
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
      // {
      //   base: 'translations',
      //   func: raycastTranslate,
      // },
      {
        base: 'me/trial_status',
        func: raycastTrialStatus,
      },
      // {
      //   base: 'me/sync',
      //   func: unblockRequest,
      // },
      // {
      //   base: 'ai/models',
      //   func: unblockRequest,
      // },
      // {
      //   base: 'ai/chat_completions',
      //   func: unblockRequest,
      // },
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
  kerlig: {
    base: 'https://b.kerlig.local/api/v1',
    customs: [
      {
        base: 'license',
        func: kerLigActivate,
      },
    ],
  },
  screenStudio: {
    base: [
      'https://www.screen.studio/api/trpc',
      'https://screen.studio/api/trpc',
      // https://screen.studio/api/trpc/auth.authorize.app.licenseKey
    ],
    customs: [
      {
        base: 'license.verify',
        func: screenStudioVerify,
      },
      {
        base: 'license.activate',
        func: screenStudioActivate,
      },
      {
        base: 'license.licenseInfo',
        func: screenStudioLicenseInfo,
      },
      {
        base: 'auth.authorize.app.licenseKey',
        func: screenStudioAuthorizeLicenseKeyInV3,
      },
      {
        base: 'auth.authorize.app.deactivate',
        func: screenStudioDeactivateLicenseKeyInV3,
      },
    ],
  },
  // export NODE_TLS_REJECT_UNAUTHORIZED="0"
  [base64Decode('bWVtbw==')]: {
    base: [
      base64Decode('aHR0cDovL21veXVmZWQuY29tOjMwMDIvYXBp'),
      base64Decode('aHR0cHM6Ly9saWNlbnNlLm1lbW8uYWMvdjE='),
    ],
    customs: [
      {
        base: 'users/cdkey',
        func: () => {
          return ResponseDone({
            body: {
              message: '',
              success: true,
              code: 200,
            },
          })
        },
      },
      {
        base: 'licenses/validate',
        func: lemonsqueezyValidate,
      },
      {
        base: 'licenses/activate',
        func: lemonSqueezyActive,
      },
      {
        base: 'licenses/deactivate',
        func: lemonSqueezyDeactivate,
      },
    ],
  },
  duet: {
    base: 'https://rdp.duetdisplay.com/v1',
    customs: [
      {
        base: 'users/validateReceipt',
        func: DuetValidateReceipt,
      },
    ],
  },
  // revenuecat: {
  //   base: 'https://api.revenuecat.com/v1',
  //   activate: {
  //     base: 'subscribers/*',
  //     func: revenueCatActivate,
  //   },
  // },
}
