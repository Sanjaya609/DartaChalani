import emailSetupAPI from '@/core/private/Security/EmailSetup/services/email.api'
import moduleSetupAPI from '@/core/private/Security/ModuleSetup/services/moduleSetup.api'
import roleSetupAPI from '@/core/private/Security/RoleSetup/services/roleSetup.api'
import userSetupAPI from '@/core/private/Security/UserSetup/services/user-setup.api'

export const securityAPI = {
  ...moduleSetupAPI,
  ...roleSetupAPI,
  ...emailSetupAPI,
  ...userSetupAPI,
}
