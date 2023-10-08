import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddRegistrationBookInitialValue,
  IRegistrationBookResponse,
} from '../schema/add-registration-book.interface'

const {
  createRegistrationBook,
  getAllRegistrationBook,
  getRegistrationBookById,
} = apiDetails

const useCreateRegistrationBook = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddRegistrationBookInitialValue) => {
      return initApiRequest({
        apiDetails: createRegistrationBook,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllRegistrationBook.controllerName])
      },
    }
  )
}

const useGetAllRegistrationBook = <T = IRegistrationBookResponse[]>() => {
  return useQuery(
    [getAllRegistrationBook.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IRegistrationBookResponse[]>>({
        apiDetails: getAllRegistrationBook,
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

const useGetRegistrationBookDetailById = (id: string | number | null) => {
  return useQuery(
    [getRegistrationBookById.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IRegistrationBookResponse>>({
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
    }
  )
}

export {
  useCreateRegistrationBook,
  useGetAllRegistrationBook,
  useGetRegistrationBookDetailById,
}
