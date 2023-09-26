import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IOfficeInitialValue,
  IOfficeListResponse,
} from '../schema/office.interface'

const { createOffice, getAllOffice, changeOfficeStatus } = apiDetails

const useCreateOffice = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IOfficeInitialValue) => {
      return initApiRequest({
        apiDetails: createOffice,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllOffice.controllerName])
      },
    }
  )
}

const useGetAllOffice = <T = IOfficeListResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllOffice.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IOfficeListResponse[]>>({
        apiDetails: getAllOffice,
      }),
    {
      select: (data) => {
        const officeData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: officeData,
                id: 'id',
                name: 'officeNameEn',
                nameNp: 'officeNameNP',
              })
            : officeData
        ) as T
      },
    }
  )
}

const useChangeOfficeStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { officeId: number | string }) => {
      return initApiRequest({
        apiDetails: changeOfficeStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllOffice.controllerName])
      },
    }
  )
}

export { useChangeOfficeStatus, useCreateOffice, useGetAllOffice }
