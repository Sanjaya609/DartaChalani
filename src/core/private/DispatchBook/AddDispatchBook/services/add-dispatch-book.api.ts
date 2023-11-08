import { RequestMethod } from '@/lib/api-request'

const prefix = '/dispatch-book'

const dispatchBookAPI = {
  createDispatchBook: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_DISPATCH_BOOK',
    requestMethod: RequestMethod.POST,
  },
  getAllDispatchBook: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_DISPATCH_BOOK',
    requestMethod: RequestMethod.GET,
  },
  getDispatchBookById: {
    controllerName: `${prefix}/{id}`,
    queryKeyName: 'GET_DISPATCH_BOOK_DETAIL_BY_ID',
    requestMethod: RequestMethod.GET,
  },
  downloadDocumentForDispatchBook: {
    controllerName: `dispatch-book/download-file`,
    queryKeyName: 'DOWNLOAD_DOCUMENT_FOR_DISPATCH_BOOK',
    requestMethod: RequestMethod.GET,
  },
  deleteDocumentForDispatchBook: {
    controllerName: `${prefix}/document`,
    queryKeyName: 'DELETE_DOCUMENT_FOR_DISPATCH_BOOK',
    requestMethod: RequestMethod.DELETE,
  },
}

export default dispatchBookAPI
