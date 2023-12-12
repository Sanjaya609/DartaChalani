import { RequestMethod } from '@/lib/api-request'

const prefix = '/module'

const moduleSetupAPI = {
    createModule: {
        controllerName: `${prefix}`,
        queryKeyName: 'CREATE_MODULE',
        requestMethod: RequestMethod.POST,
    },
    getAllModule: {
        controllerName: `${prefix}/list`,
        queryKeyName: 'GET_ALL_MODULE',
        requestMethod: RequestMethod.GET,
    },
    getModuleById: {
        controllerName: `${prefix}/{moduleId}`,
        queryKeyName: "GET_MODULE_BY_ID",
        requestMethod: RequestMethod.GET
    },
    changeModuleStatus: {
        controllerName: `${prefix}/{moduleId}`,
        queryKeyName: "CHANGE_MODULE_STATUS",
        requestMethod: RequestMethod.PUT
    },
    getConfigurableModuleList: {
        controllerName: `${prefix}/configurable-list`,
        queryKeyName: "GET_CONFIGURABLE_MODULE_LIST",
        requestMethod: RequestMethod.GET
    },
    getModuleListByStatus: {
        controllerName: `${prefix}/list/{isActive}`,
        queryKeyName: "GET_MODULE_LIST_BY_STATUS",
        requestMethod: RequestMethod.GET
    },
    getUnConfigurableModuleList: {
        controllerName: `${prefix}/unconfigurable-list`,
        queryKeyName: "GET_UNCONFIGURABLE_MODULE_LIST",
        requestMethod: RequestMethod.GET
    }
}

export default moduleSetupAPI
