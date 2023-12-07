import { RequestMethod } from '@/lib/api-request'

const prefix = '/recommendation'

const addRecommendationAPI = {
  createRecommendation: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_RECOMMENDATION',
    requestMethod: RequestMethod.POST,
  },
  getAllRecommendation: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_RECOMMENDATION',
    requestMethod: RequestMethod.GET,
  },
  changeRecommendationStatus: {
    controllerName: `${prefix}/{recommendationId}`,
    queryKeyName: 'CHANGE_RECOMMENDATION_STATUS',
    requestMethod: RequestMethod.PUT,
  },
  getRecommendationById: {
    controllerName: `${prefix}/{id}`,
    queryKeyName: 'GET_RRECOMMENDATION_DETAIL_BY_ID',
    requestMethod: RequestMethod.GET,
  },
  deleteRecommendation: {
    controllerName: `${prefix}/{id}`,
    queryKeyName: 'DELETE_RECOMMENDATION_BY_ID',
    requestMethod: RequestMethod.DELETE,
  },
}

export default addRecommendationAPI
