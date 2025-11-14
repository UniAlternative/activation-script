import { Done } from '@as/shared'

/**
 * @url https://backend.raycast.com/api/v1/me
 */
export function raycastActivate() {
  return activeWithResponse()
}

function activeWithResponse() {
  const body = JSON.parse($response.body)

  const eligibleFields = Object.keys(body)
    .filter(key => key.startsWith('eligible_'))
    .reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as Record<string, boolean>)

  return Done({
    headers: {
      ...$response.headers,
    },
    body: {
      ...body,
      name: `☕︎ ${body.name}`,
      has_active_subscription: true,
      has_pro_features: true,
      has_better_ai: true,
      ...eligibleFields,
      publishing_bot: true,
      can_upgrade_to_pro: false,
      admin: true,
    },
  })
  // sendNotification("Raycast", "Activate Success", "Done");
}
