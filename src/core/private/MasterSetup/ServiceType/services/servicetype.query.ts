import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IServiceTypeInitialValue,
  IServiceTypeResponse,
} from '../schema/servicetype.interface'

const { createServiceType, getAllServiceType, changeServiceTypeStatus } =
  apiDetails

const useCreateServiceType = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IServiceTypeInitialValue) => {
      return initApiRequest({
        apiDetails: createServiceType,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllServiceType.controllerName])
      },
    }
  )
}

const useGetAllServiceType = <T = IServiceTypeResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllServiceType.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IServiceTypeResponse[]>>({
        apiDetails: getAllServiceType,
      }),
    {
      select: (data) => {
        const fiscalYearData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
              arrayData: fiscalYearData,
              id: 'id',
              name: 'nameEn',
              nameNp: 'nameNp',
            })
            : fiscalYearData
        ) as T
      },
    }
  )
}

const useChangeServiceTypeStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { serviceTypeId: number | string }) => {
      return initApiRequest({
        apiDetails: changeServiceTypeStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllServiceType.controllerName])
      },
    }
  )
}

export {
  useCreateServiceType,
  useGetAllServiceType,
  useChangeServiceTypeStatus,
}
