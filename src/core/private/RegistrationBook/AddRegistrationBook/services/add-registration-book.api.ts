import { RequestMethod } from '@/lib/api-request'

const prefix = '/registration-book'

const addRegistrationBookAPI = {
  createRegistrationBook: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_REGISTRATION_BOOK',
    requestMethod: RequestMethod.POST,
  },
  getAllRegistrationBook: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_REGISTRATION_BOOK',
    requestMethod: RequestMethod.GET,
  },
  changeRegistrationBookStatus: {
    controllerName: `${prefix}/{registrationBookId}`,
    queryKeyName: 'CHANGE_REGISTRATION_BOOK_STATUS',
    requestMethod: RequestMethod.PUT,
  },
  getRegistrationBookById: {
    controllerName: `${prefix}/{id}`,
    queryKeyName: 'GET_REGISTRATION_BOOK_DETAIL_BY_ID',
    requestMethod: RequestMethod.GET,
  },
  downloadDocumentForRegistrationBook: {
    controllerName: `registration-book/download-file`,
    queryKeyName: 'DOWNLOAD_DOCUMENT_FOR_REGISTRATION_BOOK',
    requestMethod: RequestMethod.GET,
  },
  deleteDocumentForRegistrationBook: {
    controllerName: `${prefix}/document`,
    queryKeyName: 'DELETE_DOCUMENT_FOR_REGISTRATION_BOOK',
    requestMethod: RequestMethod.DELETE,
  },
  deleteRegistrationBook: {
    controllerName: `${prefix}/{id}`,
    queryKeyName: 'DELETE_REGISTRATION_BOOK_BY_ID',
    requestMethod: RequestMethod.DELETE,
  },
}

export default addRegistrationBookAPI
