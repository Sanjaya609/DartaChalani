import { RequestBodyType, RequestMethod } from '@/lib/api-request'

const prefix = '/enum'

const genericAPI = {
  getDataByEnumType: {
    controllerName: `${prefix}/{enumType}`,
    baseUrl: `${import.meta.env.VITE_API_BASEPOINT}`,
    queryKeyName: 'GET_DATA_BY_ENUM_TYPE',
    requestMethod: RequestMethod.GET,
  },
}

export default genericAPI
