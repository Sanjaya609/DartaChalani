import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiDetails } from '@/service/api'
import { initApiRequest } from '@/lib/api-request'
import { IChangePassword, IInitResponse } from './oauth.interface'

const {
  oauthAPI: { getInitData, changePassword, resetPassword },
} = apiDetails

export const useGetInitData = (isAuthenticated?: boolean) => {
  return useQuery(
    [getInitData.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<IInitResponse>>({
        apiDetails: getInitData,
      }),
    {
      select: (data) => {
        return data?.data?.data
      },
      enabled: !!isAuthenticated,
    }
  )
}

export const useChangePassword = () => {
  return useMutation((requestData: IChangePassword) => {
    return initApiRequest({
      apiDetails: changePassword,
      requestData,
    })
  })
}

export const useSendResetPasswordLink = () => {
  return useMutation((requestData: { email: string }) => {
    return initApiRequest({
      apiDetails: resetPassword,
      requestData,
    })
  })
}
