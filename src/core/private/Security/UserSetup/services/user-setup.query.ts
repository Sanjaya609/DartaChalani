import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IUserSetupInitialValue,
  IUserSetupResponse,
} from '../schema/user-setup.interface'

const { createUser, getAllUser, changeUserStatus } = apiDetails

const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IUserSetupInitialValue) => {
      return initApiRequest({
        apiDetails: createUser,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllUser.controllerName])
      },
    }
  )
}

const useGetAllUser = <T = IUserSetupResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllUser.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IUserSetupResponse[]>>({
        apiDetails: getAllUser,
      }),
    {
      select: (data) => {
        const userData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: userData,
                id: 'id',
                name: 'fullNameEn',
                nameNp: 'fullNameNp',
              })
            : userData
        ) as T
      },
    }
  )
}

const useChangeUserStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { userId: number | string }) => {
      return initApiRequest({
        apiDetails: changeUserStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllUser.controllerName])
      },
    }
  )
}

export { useChangeUserStatus, useCreateUser, useGetAllUser }
