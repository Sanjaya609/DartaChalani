import fiscalYearAPI from '@/core/private/MasterSetup/FiscalYear/services/fiscalyear.api'
import oauthAPI from '@/service/oauth/oauth'

export const apiDetails = {
  oauthAPI,
  ...fiscalYearAPI,
}
