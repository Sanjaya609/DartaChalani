import { RequestMethod } from '@/lib/api-request'

const prefix = '/auth'

const initApi = {
  getInit: {
    controllerName: `${prefix}/api/init`,
    queryKeyName: 'INIT',
    requestMethod: RequestMethod.GET,
  },
}

export default initApi
