import { masterAPIs } from '@/core/private/MasterSetup/services/mastersetup.api'
import { securityAPI } from '@/core/private/Security/services/security.api'
import oauthAPI from '@/service/oauth/oauth'
import genericAPI from '@/service/generic'
import addRegistrationBookAPI from '@/core/private/RegistrationBook/AddRegistrationBook/services/add-registration-book.api'

export const apiDetails = {
  oauthAPI,
  ...masterAPIs,
  ...securityAPI,
  ...genericAPI,
  ...addRegistrationBookAPI,
}
