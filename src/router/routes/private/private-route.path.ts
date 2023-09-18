import { masterSetupRoutePath } from './master-setup/master-setup-route.path'
import { securityRoutePath } from './security/security-route.path'

export const privateRoutePath = {
  base: '/',
  masterSetup: masterSetupRoutePath,
  security: securityRoutePath
} as const
