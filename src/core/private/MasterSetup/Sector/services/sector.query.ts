import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ISectorInitialValue,
  ISectorResponse,
} from '../schema/sector.interface'

const { createSector, getAllSector, changeSectorStatus, getAllActiveSector } =
  apiDetails

const useCreateSector = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: ISectorInitialValue) => {
      return initApiRequest({
        apiDetails: createSector,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllSector.controllerName])
      },
    }
  )
}

const useGetAllSector = <T = ISectorResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllSector.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<ISectorResponse[]>>({
        apiDetails: getAllSector,
      }),
    {
      select: (data) => {
        const sectorData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: sectorData,
                id: 'id',
                name: 'subSectorNameEnglish',
                nameNp: 'subSectorNameNepali',
              })
            : sectorData
        ) as T
      },
    }
  )
}

const useGetAllActiveSector = <T = ISectorResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllActiveSector.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<ISectorResponse[]>>({
        apiDetails: getAllActiveSector,
      }),
    {
      select: (data) => {
        const sectorData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: sectorData,
                id: 'id',
                name: 'subSectorNameEnglish',
                nameNp: 'subSectorNameNepali',
              })
            : sectorData
        ) as T
      },
    }
  )
}

const useChangeSectorStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { sectorId: number | string }) => {
      return initApiRequest({
        apiDetails: changeSectorStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllSector.controllerName])
      },
    }
  )
}

export {
  useChangeSectorStatus,
  useCreateSector,
  useGetAllSector,
  useGetAllActiveSector,
}
