import { dispatchBookRoutePath } from './dispatch-book/dispatch-book.path'
import { masterSetupRoutePath } from './master-setup/master-setup-route.path'
import { registrationBookRoutePath } from './registration-book/registration-book.path'
import { securityRoutePath } from './security/security-route.path'
import { standingListRoutePath } from './standing-list/standing-list-route.path'
import { recommendationSetupRoutePath } from './recommendation/recommendation.path'
import { dynamicFormRoutePath } from './dynamic-form/dynamic-form.path'

export const privateRoutePath = {
  base: '/',
  dashboard: '/dashboard',
  masterSetup: masterSetupRoutePath,
  security: securityRoutePath,
  standingList: standingListRoutePath,
  registrationBook: registrationBookRoutePath,
  dispatchBook: dispatchBookRoutePath,
  recommendation: recommendationSetupRoutePath,
  dynamicForm: dynamicFormRoutePath,
} as const
