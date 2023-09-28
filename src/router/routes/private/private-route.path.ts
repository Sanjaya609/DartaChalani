import { masterSetupRoutePath } from './master-setup/master-setup-route.path'
import { securityRoutePath } from './security/security-route.path'
import { standingListRoutePath } from './standing-list/standing-list-route.path'

export const privateRoutePath = {
  base: '/',
  masterSetup: masterSetupRoutePath,
  security: securityRoutePath,
  standingList: standingListRoutePath,
} as const
