import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IStandingListInitialValue,
  IStandingListPayload,
  IStandingListResponse,
} from '../schema/standing-list.interface'

const {
  createStandingList,
  getAllStandingList,
  getStandingListById,
  deleteStandingList,
} = apiDetails

const useCreateStandingList = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IStandingListPayload) => {
      return initApiRequest({
        apiDetails: createStandingList,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllStandingList.controllerName])
      },
    }
  )
}

const useGetAllStandingList = <T = IStandingListResponse[]>() => {
  return useQuery(
    [getAllStandingList.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IStandingListResponse[]>>({
        apiDetails: getAllStandingList,
      }),
    {
      select: (data) => {
        const registrationBookData = data?.data?.data?.length
          ? data.data.data
          : []
        return registrationBookData as T
      },
      staleTime: 0,
    }
  )
}

const useGetStandingListDetailById = (id: string | number | null) => {
  return useQuery(
    [getStandingListById.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IStandingListResponse>>({
        apiDetails: getStandingListById,
        pathVariables: {
          id,
        },
      }),
    {
      select: (data) => {
        return data?.data?.data
      },
      enabled: !!id,
    }
  )
}

const useDeleteStandingListById = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: number | string) => {
      return initApiRequest({
        apiDetails: deleteStandingList,
        pathVariables: { id },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllStandingList.controllerName])
      },
    }
  )
}

export {
  useCreateStandingList,
  useGetAllStandingList,
  useGetStandingListDetailById,
  useDeleteStandingListById,
}
