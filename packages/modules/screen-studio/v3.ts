import { ResponseDone, destr } from '@as/shared'
import { getLemonSqueezyLicenseKeyFromRequest } from '../lemon-squeezy/share'

export function screenStudioAuthorizeLicenseKeyInV3() {
  const body = destr($request.body) as {
    json: string
  } | undefined
  const license_key = getLemonSqueezyLicenseKeyFromRequest(body?.json)

  console.log(body)
  console.log(license_key)

  return ResponseDone({
    body: {
      result: {
        type: 'data',
        data: {
          json: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWNjZXNzIjp0cnVlLCJkYXRhIjp7ImlzQWRtaW4iOnRydWUsInByb3ZpZGVyIjoibGljZW5zZS1rZXkiLCJleHAiOjg2NDAwMDAwMDAwMDAsInZlcnNpb24iOiIzLjAuMCIsImFybTY0IjoiaHR0cHM6Ly9wcmV2aWV3LnNjcmVlbi5zdHVkaW8vIiwiYXJtNjRETUciOiJodHRwczovL3ByZXZpZXcuc2NyZWVuLnN0dWRpby8iLCJ4NjQiOiJodHRwczovL3ByZXZpZXcuc2NyZWVuLnN0dWRpby8iLCJ0eXBlIjoiYXV0aCIsInVzZXJJZCI6Ijg4ODg4ODg4LTg4ODgtODg4OC04ODg4LTg4ODg4ODg4ODg4OCIsImZ1bGxOYW1lIjoiWDFhMEhlIiwiaWF0IjoxNzMzNTg3MjAwLCJhcHBBY3RpdmF0aW9uIjp7InR5cGUiOiJsaWNlbnNlLWtleSIsImxpY2Vuc2VLZXlJZCI6OTk5LCJpbnN0YW5jZUlkIjoiODg4ODg4ODgtODg4OC04ODg4LTg4ODgtODg4ODg4ODg4ODg4In0sIng2NERNRyI6Imh0dHBzOi8vcHJldmlldy5zY3JlZW4uc3R1ZGlvLyIsImVtYWlsIjoiWDFhMEhlQENyYWNrZWQuY29tIiwiY3JlYXRlZEF0IjoiMjAyNC0xMi0wOFQwMDowMDowMFoifX0.vMEDnH8wdg-09j1MlMccNkj7DiFfRQa1f2UWYz74-So',
          },
        },
      },

    },
  })
}

export function screenStudioDeactivateLicenseKeyInV3() {
  return ResponseDone({
    body: {
      result: {
        type: 'data',
        data: {
          json: {
            token: '',
          },
        },
      },
    },
  })
}
