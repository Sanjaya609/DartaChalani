import { masterSetupRoutePath } from './master-setup/master-setup-route.path'

export const privateRoutePath = {
  base: '/',
  masterSetup: masterSetupRoutePath,
} as const
