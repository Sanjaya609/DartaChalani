import { RequestMethod } from '@/lib/api-request'

const prefix = '/module'

export const moduleAPI = {
  getAllModuleList: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_MODULE_LIST',
    requestMethod: RequestMethod.GET,
  },
}
