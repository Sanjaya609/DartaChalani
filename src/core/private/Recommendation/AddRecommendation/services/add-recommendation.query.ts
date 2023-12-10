import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddRecommendationInitialValue,
  IRecommendationResponse,
} from '../schema/add-recommendation.interface'

const {
  deleteRecommendation,
  getAllRecommendation,
  createRecommendation,
  getRecommendationById,
  // changeRecommendationStatus
} = apiDetails

const useCreateRecommendation = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddRecommendationInitialValue) => {
      return initApiRequest({
        apiDetails: createRecommendation,
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

const useGetRecommendationDetailById = (id: string | number | null) => {
  return useQuery(
    [getRecommendationById.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IRecommendationResponse>>({
        apiDetails: getRecommendationById,
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

const useDeleteRecommendationById = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: number | string) => {
      return initApiRequest({
        apiDetails: deleteRecommendation,
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

// const useChangeRecommendationStatus = () => {
//   const queryClient = useQueryClient()
//   return useMutation(
//     (pathVariables: { recommendationId: number | string }) => {
//       return initApiRequest({
//         apiDetails: changeRecommendationStatus,
//         pathVariables,
//       })
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries([getAllRecommendation.controllerName])
//       },
//     }
//   )
// }

export {
  useCreateRecommendation,
  useGetAllRecommendation,
  useGetRecommendationDetailById,
  useDeleteRecommendationById,
  // useChangeRecommendationStatus
}
