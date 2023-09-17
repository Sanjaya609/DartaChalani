import { masterAPIs } from '@/core/private/MasterSetup/services/mastersetup.api'
import oauthAPI from '@/service/oauth/oauth'
import { securityAPIs } from '@/core/private/Security/services/security.api'

export const apiDetails = {
  oauthAPI,
  ...masterAPIs,
  ...securityAPIs,
}
