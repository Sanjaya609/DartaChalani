import { RequestMethod } from '@/lib/api-request'

const prefix = '/sector'

const sectorAPI = {
  createSector: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_SECTOR',
    requestMethod: RequestMethod.POST,
  },
  getAllSector: {
    controllerName: `${prefix}/list`,
    queryKeyName: 'GET_ALL_SECTOR',
    requestMethod: RequestMethod.GET,
  },
  changeSectorStatus: {
    controllerName: `${prefix}/{sectorId}`,
    queryKeyName: 'CHANGE_SECTOR_STATUS',
    requestMethod: RequestMethod.PUT,
  },
}

export default sectorAPI
