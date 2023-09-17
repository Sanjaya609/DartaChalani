import fiscalYearAPI from '../FiscalYear/services/fiscalyear.api'
import sectorAPI from '../Sector/services/sector.api'
import serviceTypeAPI from '../ServiceType/services/servicetype.api'

export const masterAPIs = {
  ...fiscalYearAPI,
  ...sectorAPI,
  ...serviceTypeAPI,
}
