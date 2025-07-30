import { ResponseDone, destr } from '@as/shared'

/**
 * 处理 RevenueCat 订阅者请求
 * @url https://api.revenuecat.com/v1/subscribers/*
 */
export function revenueCatActivate() {
  const url = $request.url

  // 如果是 attributes 请求，直接返回原始响应
  if (url.includes('/attributes')) {
    return ResponseDone({
      body: $response.body,
      headers: $response.headers,
    })
  }

  const responseBody = {
    request_date: '2025-04-15T03:08:18Z',
    request_date_ms: 1744686498242,
    subscriber: {
      entitlements: {
        premium: {
          expires_date: '2999-12-31T00:00:00Z',
          grace_period_expires_date: null,
          product_identifier: 'prod_Lbx6dk453gMvkB',
          purchase_date: '2023-09-13T16:34:42Z',
        },
      },
      first_seen: '2023-09-13T16:33:56Z',
      last_seen: '2023-09-13T16:33:56Z',
      management_url: null,
      non_subscriptions: {},
      original_app_user_id: null,
      original_application_version: null,
      original_purchase_date: null,
      other_purchases: {},
      subscriptions: {
        prod_Lbx6dk453gMvkB: {
          auto_resume_date: null,
          billing_issues_detected_at: '2999-09-20T16:38:23Z',
          display_name: null,
          expires_date: '2999-09-20T16:34:42Z',
          grace_period_expires_date: null,
          is_sandbox: false,
          original_purchase_date: '2023-09-13T16:34:42Z',
          period_type: 'normal',
          price: {
            amount: 0.0,
            currency: 'USD',
          },
          purchase_date: '2023-09-13T16:34:42Z',
          refunded_at: null,
          store: 'stripe',
          store_transaction_id: null,
          unsubscribe_detected_at: '2023-09-13T16:34:42Z',
        },
      },
    },
  }

  return ResponseDone({
    body: responseBody,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
