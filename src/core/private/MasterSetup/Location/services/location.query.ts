import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useQuery } from '@tanstack/react-query'
import {
  IDistrictList,
  ILocalBodyList,
  IProvinceList,
} from '../schema/location.interface'

const {
  getProvinceList,
  getDistrictListByProvinceId,
  getLocalBodyListByDistrictId,
} = apiDetails

const useGetAllProvince = <T = IProvinceList[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getProvinceList.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IProvinceList[]>>({
        apiDetails: getProvinceList,
      }),
    {
      select: (data) => {
        const provinceData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: provinceData,
                id: 'id',
                name: 'provinceNameEn',
                nameNp: 'provinceNameNp',
              })
            : provinceData
        ) as T
      },
    }
  )
}

const useGetAllDistrictByProvinceId = <T = IDistrictList[]>(
  provinceId: string | number,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getDistrictListByProvinceId.controllerName, provinceId],
    () =>
      initApiRequest<BackendSuccessResponse<IDistrictList[]>>({
        apiDetails: getDistrictListByProvinceId,
        pathVariables: { provinceId },
      }),
    {
      select: (data) => {
        const districtData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: districtData,
                id: 'id',
                name: 'districtNameEn',
                nameNp: 'districtNameNp',
              })
            : districtData
        ) as T
      },
      enabled:
        !!provinceId &&
        (getDataWithPropsValue && 'enabled' in getDataWithPropsValue
          ? getDataWithPropsValue.enabled
          : true),
    }
  )
}

const useGetAllLocalBodyByDistrictId = <T = ILocalBodyList[]>(
  districtId: string | number,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getLocalBodyListByDistrictId.controllerName, districtId],
    () =>
      initApiRequest<BackendSuccessResponse<ILocalBodyList[]>>({
        apiDetails: getLocalBodyListByDistrictId,
        pathVariables: { districtId },
      }),
    {
      select: (data) => {
        const localBodyData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: localBodyData,
                id: 'localBodyId',
                name: 'localBodyNameEn',
                nameNp: 'localBodyNameNp',
              })
            : localBodyData
        ) as T
      },
      enabled:
        !!districtId &&
        (getDataWithPropsValue && 'enabled' in getDataWithPropsValue
          ? getDataWithPropsValue.enabled
          : true),
    }
  )
}

export {
  useGetAllProvince,
  useGetAllDistrictByProvinceId,
  useGetAllLocalBodyByDistrictId,
}
