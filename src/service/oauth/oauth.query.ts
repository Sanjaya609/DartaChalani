import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  IChangePassword,
  IInitResponse,
  IResetPassword,
} from './oauth.interface'

const {
  oauthAPI: { getInitData, changePassword, resetPassword, forgotPassword },
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

export const useForgotPassword = () => {
  return useMutation((requestData: IResetPassword) => {
    return initApiRequest({
      apiDetails: forgotPassword,
      requestData,
    })
  })
}
