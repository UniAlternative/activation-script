import { ResponseDone } from '@as/shared'

/**
 * @url https://api.elpass.app/device/management
 */
export function elpassManagement() {
  return ResponseDone({
    body: {
      email: 'QiuChenly@52pojie.com',
      subscriptionBillingPeriod: null,
      subscriptionEndDate: 99999502400,
      subscriptionSource: null,
      autoRenew: true,
      trial: false,
    },
  })
}

/**
 * @url https://api.elpass.app/device/init
 */
export function elpassInit() {
  return ResponseDone({
    body: {
      code: 0,
      subscriptionBillingPeriod: null,
      subscriptionEndDate: 99999502400, // 5100年授权
      subscriptionSource: null,
      autoRenew: true,
      trial: false,
    },
  })
}
