import { RequestMethod } from '@/lib/api-request'

const prefix = '/role'

const roleSetupAPI = {
  createRole: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_ROLE',
    requestMethod: RequestMethod.POST,
  },
  getAllRole: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_ROLE',
    requestMethod: RequestMethod.GET,
  },
  getRoleById: {
    controllerName: `${prefix}/{roleId}`,
    queryKeyName: 'GET_ROLE_BY_ID',
    requestMethod: RequestMethod.GET,
  },
  changeRoleStatus: {
    controllerName: `${prefix}/{roleId}`,
    queryKeyName: 'CHANGE_ROLE_STATUS',
    requestMethod: RequestMethod.PUT,
  },
  findRoleList: {
    controllerName: `${prefix}/list/{roleType}d`,
    queryKeyName: 'FIND_ROLE_LIST',
    requestMethod: RequestMethod.PUT,
  },
  getAllActiveRole: {
    controllerName: `${prefix}/list/active`,
    queryKeyName: 'GET_ALL_ACTIVE_ROLE',
    requestMethod: RequestMethod.GET,
  },
}

export default roleSetupAPI
