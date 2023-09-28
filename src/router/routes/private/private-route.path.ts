import { masterSetupRoutePath } from './master-setup/master-setup-route.path'
import { registrationBookRoutePath } from './registration-book/registration-book.path'
import { securityRoutePath } from './security/security-route.path'

export const privateRoutePath = {
  base: '/',
  masterSetup: masterSetupRoutePath,
  security: securityRoutePath,
  registrationBook: registrationBookRoutePath,
} as const
