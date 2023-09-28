import { RequestMethod } from '@/lib/api-request'

const prefix = '/location-data'

const locationAPI = {
  getProvinceList: {
    controllerName: `${prefix}/province/list`,
    queryKeyName: 'GET_PROVINCE_LIST',
    requestMethod: RequestMethod.GET,
  },
  getDistrictListByProvinceId: {
    controllerName: `${prefix}/district/list/{provinceId}`,
    queryKeyName: 'GET_DISTRICT_LIST_BY_PROVINCE_ID',
    requestMethod: RequestMethod.GET,
  },
  getLocalBodyListByDistrictId: {
    controllerName: `${prefix}/local-body/list/{districtId}`,
    queryKeyName: 'GET_LOCALBODY_BY_DISTRICT_ID',
    requestMethod: RequestMethod.GET,
  },
}

export default locationAPI
