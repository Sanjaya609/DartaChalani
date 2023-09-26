import { RequestMethod } from '@/lib/api-request'

const prefix = '/user'

const userSetupAPI = {
  createUser: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_USER',
    requestMethod: RequestMethod.POST,
  },
  getAllUser: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_USER',
    requestMethod: RequestMethod.GET,
  },
  changeUserStatus: {
    controllerName: `${prefix}/{userId}`,
    queryKeyName: 'CHANGE_USER_STATUS',
    requestMethod: RequestMethod.PUT,
  },
}

export default userSetupAPI
