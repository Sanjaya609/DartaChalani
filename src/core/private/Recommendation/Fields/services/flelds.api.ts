import { RequestMethod } from '@/lib/api-request'

const prefix = '/field'
const fieldValuePrefix = '/field-value'

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
  getFieldDetailById: {
    controllerName: `${prefix}/{id}`,
    queryName: 'GET_FIELD_DETAIL_BY_ID',
    requestMethod: RequestMethod.GET
  },
  getAllFieldByRecommendationId: {
    controllerName: `${prefix}/recommendation/{id}`,
    queryKeyName: 'GET_ALL_FIELD_BY_RECOMMENDATION_ID',
    requestMethod: RequestMethod.GET,
  },
  deleteFieldById: {
    controllerName: `${prefix}/{id}`,
    queryName: 'DELETE_FIELD_BY_ID',
    requestMethod: RequestMethod.DELETE
  },
  updateFieldOrder: {
    controllerName: `${prefix}/update-order`,
    queryName: "UPDATE_FIELD_ORDER",
    requestMethod: RequestMethod.POST
  },
  dynamicFieldList: {
    controllerName: `${prefix}/list-data/{id}`,
    queryName: "DYNAMIC_FIELD_LIST",
    requestMethod: RequestMethod.GET
  },
  // field-value
  createFieldValue: {
    controllerName: `${fieldValuePrefix}`,
    queryName: "CREATE_FILED_VALUE",
    requestMethod: RequestMethod.POST
  },
  updateFieldValue: {
    controllerName: `${fieldValuePrefix}`,
    queryName: "UPDATE_FILED_VALUE",
    requestMethod: RequestMethod.POST
  }
}

export default addFieldAPI
