import { RequestMethod } from '@/lib/api-request'

const prefix = '/role-module-privileges'

const roleModuleMappingAPI = {
  createRoleMapping: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_ROLE_MAPPING',
    requestMethod: RequestMethod.POST,
  },
  deleteRoleMapping: {
    controllerName: `${prefix}`,
    queryKeyName: 'DELETE_ROLE_MAPPING',
    requestMethod: RequestMethod.DELETE,
  },
  getAssignedModulesForRole: {
    controllerName: `${prefix}/assigned-modules/{roleId}`,
    queryKeyName: 'GET_ASSIGNED_MODULES_FOR_ROLE',
    requestMethod: RequestMethod.GET,
  },
  getResourceListByModuleAndRole: {
    controllerName: `${prefix}/resource-list/{roleId}/{moduleId}`,
    queryKeyName: 'GET_RESOURCE_LIST_FOR_ROLE_BY_MODULE',
    requestMethod: RequestMethod.GET,
  },
}

export default roleModuleMappingAPI
