import { RequestMethod } from '@/lib/api-request'

const prefix = '/field'

const addFieldAPI = {
  createField: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_FIELD',
    requestMethod: RequestMethod.POST,
  },
  updateField: {
    controllerName: `${prefix}`,
    queryKeyName: 'UPDATE_FIELD',
    requestMethod: RequestMethod.PUT,
  },
  getAllField: {
    controllerName: `${prefix}`,
    queryKeyName: 'GET_ALL_FIELD',
    requestMethod: RequestMethod.GET,
  },
  getAllFieldByRecommendationId: {
    controllerName: `${prefix}/recommendation/{id}`,
    queryKeyName: 'GET_ALL_FIELD_BY_RECOMMENDATION_ID',
    requestMethod: RequestMethod.GET,
  },
}

export default addFieldAPI
