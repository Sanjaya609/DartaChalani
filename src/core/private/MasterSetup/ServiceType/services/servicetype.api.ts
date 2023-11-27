import { RequestMethod } from '@/lib/api-request'

const prefix = '/service-type'

const serviceTypeAPI = {
  createServiceType: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_SERVICE_TYPE',
    requestMethod: RequestMethod.POST,
  },
  getAllServiceType: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_SERVICE_TYPE',
    requestMethod: RequestMethod.GET,
  },
  getAllActiveServiceType: {
    controllerName: `${prefix}/list/active`,
    queryKeyName: 'GET_ALL_ACTIVE_SERVICE_TYPE',
    requestMethod: RequestMethod.GET,
  },
  changeServiceTypeStatus: {
    controllerName: `${prefix}/{serviceTypeId}`,
    queryKeyName: 'CHANGE_SERVICE_TYPE_STATUS',
    requestMethod: RequestMethod.PUT,
  },
}

export default serviceTypeAPI
