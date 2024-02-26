import { RequestMethod } from '@/lib/api-request'

const prefix = '/field'
const fieldValuePrefix = '/field-value'
const fieldValidationPrefix = '/field-validation'

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
  deleteFieldValueById: {
    controllerName: `${fieldValuePrefix}/form-value/{id}`,
    queryName: "DELETE_FORM_VALUE_BY_ID",
    requestMethod: RequestMethod.DELETE
  },
  updateFieldValue: {
    controllerName: `${fieldValuePrefix}`,
    queryName: "UPDATE_FILED_VALUE",
    requestMethod: RequestMethod.PUT
  },
  getFieldValueById: {
    controllerName: `${prefix}/recommendation/{id}`,
    queryName: "GET_FIELD_VALUE_BY_ID",
    requestMethod: RequestMethod.GET
  },
  // field validations
  createFieldValidation: {
    controllerName: `${fieldValidationPrefix}`,
    queryName: "CREATE_FIELD_VALIDATION",
    requestMethod: RequestMethod.POST
  },
  updateFieldValidation: {
    controllerName: `${fieldValidationPrefix}`,
    queryName: "UPDATE_FIELD_VALIDATION",
    requestMethod: RequestMethod.PUT
  },
  getFieldValidationById: {
    controllerName: `${fieldValidationPrefix}/{id}`,
    queryName: "GET_FIELD_VALIDATION_BY_ID",
    requestMethod: RequestMethod.GET
  },
  deleteFieldValidationById: {
    controllerName: `${fieldValidationPrefix}/{id}`,
    queryName: "DELETE_FIELD_VALIDATION_BY_ID",
    requestMethod: RequestMethod.DELETE
  },
  findAllValidationByFieldId: {
    controllerName: `${fieldValidationPrefix}/field/{id}`,
    queryName: "FIND_ALL_VALIDATION_BY_FIELD_ID",
    requestMethod: RequestMethod.GET
  },
  validationTypeEnum: {
    controllerName: `validation-type-enum/{enumKey}`,
    baseUrl: `${import.meta.env.VITE_API_BASEPOINT}`,
    queryName: "VALIDATION_TYPE_ENUM",
    requestMethod: RequestMethod.GET
  }
}

export default addFieldAPI
