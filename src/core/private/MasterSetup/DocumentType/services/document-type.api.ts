import { RequestMethod } from '@/lib/api-request'

const prefix = '/document-type'

const documentTypeAPI = {
  createDocumentType: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_DOCUMENT_TYPE',
    requestMethod: RequestMethod.POST,
  },
  getAllDocumentType: {
    controllerName: `${prefix}`,
    queryKeyName: 'GET_ALL_DOCUMENT_TYPE',
    requestMethod: RequestMethod.GET,
  },
  changeDocumentTypeStatus: {
    controllerName: `${prefix}/toggle/{documentTypeId}`,
    queryKeyName: 'CHANGE_DOCUMENT_TYPE_STATUS',
    requestMethod: RequestMethod.PUT,
  },
  getAllActiveDocumentType: {
    controllerName: `${prefix}/active-list`,
    queryKeyName: 'GET_ALL_ACTIVE_DOCUMENT_TYPE',
    requestMethod: RequestMethod.GET,
  },
  getAllRequiredDocumentTypeModuleId: {
    controllerName: `${prefix}/active-list`,
    queryKeyName: 'GET_ALL_REQUIRED_DOCUMENT_BY_MODULE_ID',
    requestMethod: RequestMethod.GET,
  },
}

export default documentTypeAPI
