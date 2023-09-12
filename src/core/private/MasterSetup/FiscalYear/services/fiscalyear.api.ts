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
}

export default fiscalYearAPI
