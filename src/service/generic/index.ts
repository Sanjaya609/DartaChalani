import { RequestBodyType, RequestMethod } from '@/lib/api-request'

const genericAPI = {
  getDataByEnumType: {
    controllerName: `/enum/{enumType}`,
    baseUrl: `${import.meta.env.VITE_API_BASEPOINT}`,
    queryKeyName: 'GET_DATA_BY_ENUM_TYPE',
    requestMethod: RequestMethod.GET,
  },
  uploadDocument: {
    controllerName: `document/upload`,
    queryKeyName: 'GET_DATA_BY_ENUM_TYPE',
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.FORM_DATA,
  },
}

export default genericAPI
