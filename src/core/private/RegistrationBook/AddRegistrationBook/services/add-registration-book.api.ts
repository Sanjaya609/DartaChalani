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
    controllerName: `${prefix}/download-file`,
    queryKeyName: 'DOWNLOAD_DOCUMENT_FOR_REGISTRATION_BOOK',
    requestMethod: RequestMethod.GET,
  },
}

export default addRegistrationBookAPI
