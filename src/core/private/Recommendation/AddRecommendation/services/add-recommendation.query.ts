import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddRecommendationInitialValue,
  IRecommendationResponse,
} from '../schema/add-recommendation.interface'

const {
  createRegistrationBook,
  // getAllRegistrationBook,
  getRegistrationBookById,
  deleteRegistrationBook,
  getAllRecommendation
} = apiDetails

const useCreateRegistrationBook = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddRecommendationInitialValue) => {
      return initApiRequest({
        apiDetails: createRegistrationBook,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllRecommendation.controllerName])
      },
    }
  )
}

const useGetAllRecommendation = <T = IRecommendationResponse[]>() => {
  return useQuery(
    [getAllRecommendation.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IRecommendationResponse[]>>({
        apiDetails: getAllRecommendation,
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

const useGetRegistrationBookDetailById = (id: string | number | null) => {
  return useQuery(
    [getRegistrationBookById.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IRecommendationResponse>>({
        apiDetails: getRegistrationBookById,
        pathVariables: {
          id,
        },
      }),
    {
      select: (data) => {
        return data?.data?.data
      },
      enabled: !!id,
      staleTime: 0,
    }
  )
}

const useDeleteRegistrationBookById = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: number | string) => {
      return initApiRequest({
        apiDetails: deleteRegistrationBook,
        pathVariables: { id },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllRecommendation.controllerName])
      },
    }
  )
}

export {
  useCreateRegistrationBook,
  useGetAllRecommendation,
  useGetRegistrationBookDetailById,
  useDeleteRegistrationBookById,
}
