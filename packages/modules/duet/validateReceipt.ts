import { ResponseDone } from '@as/shared'

/**
 * @url https://rdp.duetdisplay.com/v1/users/validateReceipt
 */
export function DuetValidateReceipt() {
  return ResponseDone({
    body: {
      success: true,
      products: [
        {
          vendor: 'apple',
          product: 'DuetAirAnnual',
          subscriptionId: 391961,
          inTrial: false,
          expiresDate: '2099-11-30T16:00:00Z',
          purchaseDate: '2024-11-30T16:00:00Z',
          cancelled: false,
        },
      ],
      hasStripeAccount: false,
    },
  })
}
