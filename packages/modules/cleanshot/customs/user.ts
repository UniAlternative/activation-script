import { Done, destr } from '@as/shared'

/**
 * @url https://api.cleanshot.cloud/v1/user
 */
export function cleanshotUser() {
  console.log('[W] It\'s a alpha script, if the script is not working, please contact the author.')
  const body = destr($response.body) as any
  if (body?.data?.user?.storage) {
    const storage = body.data.user.storage
    storage.limit_bytes = 21073741824 // 20GB
    storage.limit_readable = '20GB'
    const team = body.data.user.team
    team.billing_plan.abilities.can_upload_original_media = true
    team.billing_plan.abilities.can_copy_direct_link = true
    team.billing_plan.abilities.can_set_expire_after = true
    team.billing_plan.abilities.can_set_media_password = true
    body.data.user.email_verified = true
    body.data.user.updated_at = '2099-01-11T11:36:16.000000Z'
  }
  return Done({ body })
}
