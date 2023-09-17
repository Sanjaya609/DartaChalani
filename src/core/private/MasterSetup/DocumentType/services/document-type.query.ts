import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IDocumentTypeInitialValue,
  IDocumentTypeResponse,
} from '../schema/document-type.interface'

const { createDocumentType, getAllDocumentType, changeDocumentTypeStatus } =
  apiDetails

const useCreateDocumentType = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IDocumentTypeInitialValue) => {
      return initApiRequest({
        apiDetails: createDocumentType,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllDocumentType.controllerName])
      },
    }
  )
}

const useGetAllDocumentType = <T = IDocumentTypeResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllDocumentType.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IDocumentTypeResponse[]>>({
        apiDetails: getAllDocumentType,
      }),
    {
      select: (data) => {
        const fiscalYearData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: fiscalYearData,
                id: 'id',
                name: 'documentTypeEn',
                nameNp: 'documentTypeNp',
              })
            : fiscalYearData
        ) as T
      },
    }
  )
}

const useChangeDocumentTypeStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { documentTypeId: number | string }) => {
      return initApiRequest({
        apiDetails: changeDocumentTypeStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllDocumentType.controllerName])
      },
    }
  )
}

export {
  useChangeDocumentTypeStatus,
  useCreateDocumentType,
  useGetAllDocumentType,
}
