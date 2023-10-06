import { RequestMethod } from '@/lib/api-request'

const prefix = '/module-document-type-mapping'

const moduleDocumentMappingAPI = {
  createModuleDocumentMapping: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_MODULE_DOCUMENT_MAPPING',
    requestMethod: RequestMethod.POST,
  },
  getAllModuleDocumentMapping: {
    controllerName: `${prefix}`,
    queryKeyName: 'GET_ALL_MODULE_DOCUMENT_MAPPING',
    requestMethod: RequestMethod.GET,
  },
  changeModuleDocumentMappingStatus: {
    controllerName: `${prefix}/toggle/{moduleDocumentMappingId}`,
    queryKeyName: 'CHANGE_MODULE_DOCUMENT_MAPPING_STATUS',
    requestMethod: RequestMethod.PUT,
  },
  getAllModuleDocumentMappingByModuleId: {
    controllerName: `${prefix}/module/{moduleId}`,
    queryKeyName: 'GET_ALL_MODULE_DOCUMENT_MAPPING_BY_MODULE_ID',
    requestMethod: RequestMethod.GET,
  },
}

export default moduleDocumentMappingAPI
