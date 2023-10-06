import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IModuleDocumentMappingInitialValue,
  IModuleDocumentMappingResponse,
} from '../schema/module-document-mapping.interface'

const {
  createModuleDocumentMapping,
  getAllModuleDocumentMapping,
  changeModuleDocumentMappingStatus,
  getAllModuleDocumentMappingByModuleId,
} = apiDetails

const useCreateModuleDocumentMapping = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IModuleDocumentMappingInitialValue) => {
      return initApiRequest({
        apiDetails: createModuleDocumentMapping,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          getAllModuleDocumentMapping.controllerName,
        ])
      },
    }
  )
}

const useGetAllModuleDocumentMapping = <T = IModuleDocumentMappingResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllModuleDocumentMapping.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleDocumentMappingResponse[]>>({
        apiDetails: getAllModuleDocumentMapping,
      }),
    {
      select: (data) => {
        const documentTypeData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? documentTypeData?.map((data) => ({
                value: data.id,
                label: data.documentTypeResponse.documentTypeEn,
                labelNp: data.documentTypeResponse.documentTypeNp,
                ...data,
              })) || []
            : documentTypeData
        ) as T
      },
    }
  )
}

const useChangeModuleDocumentMappingStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { documentTypeId: number | string }) => {
      return initApiRequest({
        apiDetails: changeModuleDocumentMappingStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          getAllModuleDocumentMapping.controllerName,
        ])
      },
    }
  )
}

const useGetAllModuleDocumentMappingByModuleId = <
  T = IModuleDocumentMappingResponse[]
>(
  moduleId?: StringNumber,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllModuleDocumentMappingByModuleId.controllerName, moduleId],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleDocumentMappingResponse[]>>({
        apiDetails: getAllModuleDocumentMappingByModuleId,
        pathVariables: {
          moduleId,
        },
      }),
    {
      select: (data) => {
        const documentTypeData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? documentTypeData?.map((data) => ({
                value: data.id,
                label: data.documentTypeResponse.documentTypeEn,
                labelNp: data.documentTypeResponse.documentTypeNp,
                ...data,
              })) || []
            : documentTypeData
        ) as T
      },
      enabled: !!moduleId,
    }
  )
}

export {
  useChangeModuleDocumentMappingStatus,
  useCreateModuleDocumentMapping,
  useGetAllModuleDocumentMapping,
  useGetAllModuleDocumentMappingByModuleId,
}
