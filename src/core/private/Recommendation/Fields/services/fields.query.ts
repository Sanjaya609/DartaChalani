import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddFieldInitialValue,
  IAddFieldResponse,
  IUpdateFieldOrder,
} from '../schema/field.interface'
import { IAddFieldValueInitialValue } from '../schema/filed-value.interface'

const {
  createField,
  updateField,
  getAllFieldByRecommendationId,
  getAllField,
  getFieldDetailById,
  deleteFieldById,
  getAllGroupByRecommendationId,
  updateFieldOrder,
  dynamicFieldList,

  createFieldValue, updateFieldValue
} = apiDetails

const useCreateField = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddFieldInitialValue) => {
      return initApiRequest({
        apiDetails: requestData.id ? updateField : createField,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
      },
    }
  )
}

const useUpdateField = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IAddFieldInitialValue) => {
        return initApiRequest({
          apiDetails: updateField,
          requestData,
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
        },
      }
    )
  }

const useGetAllFieldByRecommendationId = (id: string | number | null) => {
  return useQuery(
    [getAllFieldByRecommendationId.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IAddFieldResponse[]>>({
        apiDetails: getAllFieldByRecommendationId,
        pathVariables: {
            id
        }
      }),
    {
      select: (data) => {
        
        return data?.data.data
      },
      enabled: !!id,
      staleTime: 0
    }
  )
}

const useGetAllField = <T = IAddFieldResponse[]>() => {
    return useQuery(
      [getAllField.controllerName],
      () =>
        initApiRequest<BackendSuccessResponse<IAddFieldResponse[]>>({
          apiDetails: getAllField,
        }),
      {
        select: (data) => {
          const recommendationData = data?.data?.data?.length
            ? data.data.data
            : []
          return recommendationData as T
        },
      }
    )
  }

  const useGetFieldDetailById = (id: string | number | null) => {
    return useQuery(
      [getFieldDetailById.controllerName, id],
      () =>
        initApiRequest<BackendSuccessResponse<IAddFieldResponse>>({
          apiDetails: getFieldDetailById,
          pathVariables: { id }
        }),
        {
          select: (data) => {
            return data?.data?.data
          },
          enabled: !!id,
          staleTime: 0
        }
    )
  }

  const useDeleteFieldById = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (id: number | string) => {
        return initApiRequest({
          apiDetails: deleteFieldById,
          pathVariables: { id }
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
        },
      }
      )
  }

  const useUpdateFieldOrder = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IUpdateFieldOrder[]) => {
        return initApiRequest({
          apiDetails: updateFieldOrder,
          requestData,
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
        },
      }
    )
  }

  const useGetDynamicFieldListByFormId = (id: string | number | null) => {
    return useQuery(
      [dynamicFieldList.controllerName, id],
      () =>
        initApiRequest<BackendSuccessResponse<any>>({
          apiDetails: dynamicFieldList,
          pathVariables: { id }
        }),
        {
          select: (data) => {
            return data?.data?.data
          },
          enabled: !!id,
          staleTime: 0
        }
    )
  }

  const useCreateFieldValue = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IAddFieldValueInitialValue) => {
        return initApiRequest({
          apiDetails: createFieldValue,
          requestData,
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
        },
      }
    )
  }
  
  const useUpdateFieldValue = () => {
      const queryClient = useQueryClient()
      return useMutation(
        (requestData: IAddFieldValueInitialValue) => {
          return initApiRequest({
            apiDetails: updateFieldValue,
            requestData,
          })
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
          },
        }
      )
    }

export {
  useCreateField,
  useUpdateField,
  useGetAllFieldByRecommendationId,
  useGetAllField,
  useGetFieldDetailById,
  useDeleteFieldById,
  useUpdateFieldOrder,
  useGetDynamicFieldListByFormId,

  useCreateFieldValue
}
