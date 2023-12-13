import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddFieldInitialValue,
  IAddFieldResponse,
} from '../schema/field.interface'

const {
  createField,
  updateField,
  getAllFieldByRecommendationId,
  getAllField,
} = apiDetails

const useCreateField = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddFieldInitialValue) => {
      return initApiRequest({
        apiDetails: createField,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllFieldByRecommendationId.controllerName])
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
          queryClient.invalidateQueries([getAllFieldByRecommendationId.controllerName])
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

export {
  useCreateField,
  useUpdateField,
  useGetAllFieldByRecommendationId,
  useGetAllField
}
