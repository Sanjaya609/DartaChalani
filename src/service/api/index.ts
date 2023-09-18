import { masterAPIs } from '@/core/private/MasterSetup/services/mastersetup.api'
import roleSetupAPI from '@/core/private/Security/RoleSetup/services/roleSetup.api'
import { securityAPI } from '@/core/private/Security/security.api'
import oauthAPI from '@/service/oauth/oauth'
import { securityAPIs } from '@/core/private/Security/services/security.api'

export const apiDetails = {
  oauthAPI,
  ...masterAPIs,
  ...securityAPI,
  ...securityAPIs,
}
