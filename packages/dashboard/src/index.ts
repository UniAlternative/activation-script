import { ResponseDone } from '@as/shared'

export function DashboardRoute(url: string) {
  return ResponseDone({
    body: {
      title: 'Dashboard',
      content: 'Hello, World!',
      url,
    },
  })
}
