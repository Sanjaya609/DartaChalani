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
}

export default addRegistrationBookAPI
