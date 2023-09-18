import moduleSetupAPI from "./ModuleSetup/services/moduleSetup.api"
import roleSetupAPI from "./RoleSetup/services/roleSetup.api"

export const securityAPI = {
    ...moduleSetupAPI,
    ...roleSetupAPI
}