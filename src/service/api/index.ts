import { masterAPIs } from '@/core/private/MasterSetup/services/mastersetup.api'
import { securityAPI } from '@/core/private/Security/services/security.api'
import oauthAPI from '@/service/oauth/oauth'

export const apiDetails = {
  oauthAPI,
  ...masterAPIs,
  ...securityAPI,
}
