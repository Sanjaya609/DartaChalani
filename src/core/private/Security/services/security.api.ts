import emailSetupAPI from '../EmailSetup/services/email.api'
import moduleSetupAPI from '../ModuleSetup/services/moduleSetup.api'
import roleSetupAPI from '../RoleSetup/services/roleSetup.api'

export const securityAPI = {
  ...moduleSetupAPI,
  ...roleSetupAPI,
  ...emailSetupAPI,
}
