import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddDispatchBookPayload,
  IDispatchBookResponse,
} from '../schema/add-dispatch-book.interface'

const { createDispatchBook, getAllDispatchBook, getDispatchBookById } =
  apiDetails

const useCreateDispatchBook = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddDispatchBookPayload) => {
      return initApiRequest({
        apiDetails: createDispatchBook,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllDispatchBook.controllerName])
      },
    }
  )
}

const useGetAllDispatchBook = <T = IDispatchBookResponse[]>() => {
  return useQuery(
    [getAllDispatchBook.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IDispatchBookResponse[]>>({
        apiDetails: getAllDispatchBook,
      }),
    {
      select: (data) => {
        const registrationBookData = data?.data?.data?.length
          ? data.data.data
          : []
        return registrationBookData as T
      },
    }
  )
}

const useGetDispatchBookDetailById = (id: string | number | null) => {
  return useQuery(
    [getDispatchBookById.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IDispatchBookResponse>>({
        apiDetails: getDispatchBookById,
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

export {
  useCreateDispatchBook,
  useGetAllDispatchBook,
  useGetDispatchBookDetailById,
}
