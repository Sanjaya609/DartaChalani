import { RequestBodyType, RequestMethod } from '@/lib/api-request'

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
  changePassword: {
    controllerName: '/user/change-password',
    queryKeyName: 'CHANGE_PASSWORD',
    requestMethod: RequestMethod.POST,
  },
  forgotPassword: {
    controllerName: '/user/forgot-password',
    queryKeyName: 'FORGOT_PASSWORD',
    requestMethod: RequestMethod.POST,
  },
  resetPassword: {
    controllerName: '/user/reset-password',
    queryKeyName: 'RESET_PASSWORD',
    requestMethod: RequestMethod.POST,
  },
}

export default oauthAPI
