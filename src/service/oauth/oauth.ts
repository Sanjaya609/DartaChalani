import { RequestBodyType, RequestMethod } from '@/lib/api-request'

const prefix = '/auth'

const oauthAPI = {
  getInitData: {
    controllerName: `/init`,
    queryKeyName: 'GET_INIT_DATA',
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
