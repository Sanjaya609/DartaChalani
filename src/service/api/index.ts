import fiscalYearAPI from '@/core/private/MasterSetup/FiscalYear/services/fiscalyear.api'
import { masterAPIs } from '@/core/private/MasterSetup/services/mastersetup.api'
import oauthAPI from '@/service/oauth/oauth'

export const apiDetails = {
  oauthAPI,
  ...masterAPIs,
}
