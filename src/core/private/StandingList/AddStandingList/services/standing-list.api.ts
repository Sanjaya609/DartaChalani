import { RequestMethod } from '@/lib/api-request'

const prefix = '/standing-list'

const standingListAPI = {
  createStandingList: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_STANDING_LIST',
    requestMethod: RequestMethod.POST,
  },
  getAllStandingList: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_STANDING_LIST',
    requestMethod: RequestMethod.GET,
  },
  getStandingListById: {
    controllerName: `${prefix}/{id}`,
    queryKeyName: 'GET_STANDING_LIST_DETAIL_BY_ID',
    requestMethod: RequestMethod.GET,
  },
}

export default standingListAPI
