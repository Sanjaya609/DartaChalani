import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddGroupInitialValue,
  IAddGroupResponse,
} from '../schema/group.interface'

const {
  createGroup,
  updateGroup,
  getAllGroupByRecommendationId,
  getAllGroup,
  deleteGroupById
} = apiDetails

const useCreateGroup = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddGroupInitialValue) => {
      return initApiRequest({
        apiDetails: createGroup,
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

const useUpdateGroup = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IAddGroupInitialValue) => {
        return initApiRequest({
          apiDetails: updateGroup,
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

const useGetAllGroupByRecommendationId = (id: string | number | null) => {
  return useQuery(
    [getAllGroupByRecommendationId.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IAddGroupResponse[]>>({
        apiDetails: getAllGroupByRecommendationId,
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

const useGetAllGroup = <T = IAddGroupResponse[]>() => {
    return useQuery(
      [getAllGroup.controllerName],
      () =>
        initApiRequest<BackendSuccessResponse<IAddGroupResponse[]>>({
          apiDetails: getAllGroup,
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

  const useDeleteGroupById = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (id: number | string) => {
        return initApiRequest({
          apiDetails: deleteGroupById,
          pathVariables: { id }
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName, getAllGroup.controllerName])
        },
      }
    )
  }

export {
  useCreateGroup,
  useUpdateGroup,
  useGetAllGroupByRecommendationId,
  useGetAllGroup,
  useDeleteGroupById
}
