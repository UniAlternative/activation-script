import { buildResponse } from "@as/shared";

export function DashboardRoute(url: string) {
  buildResponse({
    body: {
      title: "Dashboard",
      content: "Hello, World!",
    }
  })
}