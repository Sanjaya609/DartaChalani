import { RequestMethod } from '@/lib/api-request'

const prefix = '/auth'

const ouathAPI = {
  getInit: {
    controllerName: `${prefix}/api/init`,
    queryKeyName: 'INIT',
    requestMethod: RequestMethod.GET,
  },
  login: {
    controllerName: 'oauth/token',
    queryKeyName: 'LOGIN',
    requestMethod: RequestMethod.POST,
  },
}

export default ouathAPI
