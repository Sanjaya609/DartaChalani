import { RequestMethod } from '@/lib/api-request'

const prefix = '/drop-down'

const dropdownConfigAPI = {
  createDropdownConfig: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_DROP_DOWN_CONFIG',
    requestMethod: RequestMethod.POST,
  },
  getAllDropdownConfig: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_DROP_DOWN_CONFIG',
    requestMethod: RequestMethod.GET,
  },
  getDropdownConfigById: {
    controllerName: `${prefix}/{dropdownConfigId}`,
    queryKeyName: 'GET_DROP_DOWN_CONFIG_BY_ID',
    requestMethod: RequestMethod.GET,
  },
}

export default dropdownConfigAPI
