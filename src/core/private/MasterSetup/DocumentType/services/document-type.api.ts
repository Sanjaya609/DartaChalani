import { RequestMethod } from '@/lib/api-request'

const prefix = '/document-type'

const documentTypeAPI = {
  createDocumentType: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_DOCUMENT_TYPE',
    requestMethod: RequestMethod.POST,
  },
  getAllDocumentType: {
    controllerName: `${prefix}/active-list`,
    queryKeyName: 'GET_ALL_DOCUMENT_TYPE',
    requestMethod: RequestMethod.GET,
  },
  changeDocumentTypeStatus: {
    controllerName: `${prefix}/toggle/{documentTypeId}`,
    queryKeyName: 'CHANGE_DOCUMENT_TYPE_STATUS',
    requestMethod: RequestMethod.PUT,
  },
}

export default documentTypeAPI
