import { buildResponse } from "../utils";

export function DashboardRoute(url: string) {
  buildResponse({
    body: {
      title: "Dashboard",
      content: "Hello, World!",
    }
  })
}