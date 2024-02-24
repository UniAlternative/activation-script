import { buildResponse, destr } from '@as/shared'

/**
 * @url https://buy.itunes.apple.com/verifyReceipt
 */
export function iTunesVerifyReceipt() {
  return buildResponse({
    body: {
      status: 0,
      receipt: {
        in_app: [
          {
            expires_date_ms: 4096018800000, // 2100-01-01
            expires_date: '2100-01-01T00:00:00Z',
          },
        ],
      },
    },
  })
}
