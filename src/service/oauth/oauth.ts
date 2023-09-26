import { RequestBodyType, RequestMethod } from '@/lib/api-request'

const prefix = '/auth'

const oauthAPI = {
  getInit: {
    controllerName: `${prefix}/api/init`,
    queryKeyName: 'INIT',
    requestMethod: RequestMethod.GET,
  },
  login: {
    controllerName: 'oauth/token',
    queryKeyName: 'LOGIN',
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.AUTH,
  },
}

export default oauthAPI
