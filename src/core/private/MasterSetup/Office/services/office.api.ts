import { RequestMethod } from '@/lib/api-request'

const prefix = '/office'

const officeAPI = {
  createOffice: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_OFFICE',
    requestMethod: RequestMethod.POST,
  },
  getAllOffice: {
    controllerName: `${prefix}`,
    queryKeyName: 'GET_ALL_OFFICE',
    requestMethod: RequestMethod.GET,
  },
  changeOfficeStatus: {
    controllerName: `${prefix}/toggle/{officeId}`,
    queryKeyName: 'CHANGE_OFFICE_STATUS',
    requestMethod: RequestMethod.PUT,
  },
  getAllActiveOffice: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_ACTIVE_OFFICE',
    requestMethod: RequestMethod.GET,
  },
}

export default officeAPI
