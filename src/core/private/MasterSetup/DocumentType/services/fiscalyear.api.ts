import { RequestMethod } from '@/lib/api-request'

const prefix = '/fiscal-year'

const fiscalYearAPI = {
  createFiscalYear: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_FISCAL_YEAR',
    requestMethod: RequestMethod.POST,
  },
  getAllFiscalYear: {
    controllerName: `${prefix}/all-list`,
    queryKeyName: 'GET_FISCAL_YEAR',
    requestMethod: RequestMethod.GET,
  },
  changeFiscalYearStatus: {
    controllerName: `${prefix}/change-status/{fiscalYearId}`,
    queryKeyName: 'CHANGE_FISCAL_YEAR_STATUS',
    requestMethod: RequestMethod.PUT,
  },
  switchCurrentFiscalYear: {
    controllerName: `${prefix}/switch-into-current-fiscal-year/{fiscalYearId}`,
    queryKeyName: 'SWITCH_CURRENT_FISCAL_YEAR',
    requestMethod: RequestMethod.PUT,
  },
}

export default fiscalYearAPI
