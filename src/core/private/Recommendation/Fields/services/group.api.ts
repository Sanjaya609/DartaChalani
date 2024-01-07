import { RequestMethod } from '@/lib/api-request'

const prefix = '/grouping'

const addGroupAPI = {
  createGroup: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_GROUP',
    requestMethod: RequestMethod.POST,
  },
  updateGroup: {
    controllerName: `${prefix}`,
    queryKeyName: 'UPDATE_GROUP',
    requestMethod: RequestMethod.PUT,
  },
  getAllGroup: {
    controllerName: `${prefix}`,
    queryKeyName: 'GET_ALL_GROUP',
    requestMethod: RequestMethod.GET,
  },
  getAllGroupByRecommendationId: {
    controllerName: `${prefix}/recommendation/{id}`,
    queryKeyName: 'GET_ALL_GROUP_BY_RECOMMENDATION_ID',
    requestMethod: RequestMethod.GET,
  },
  deleteGroupById: {
    controllerName: `${prefix}/{id}`,
    queryName: 'DELETE_GROUP_BY_ID',
    requestMethod: RequestMethod.DELETE
  }
}

export default addGroupAPI
