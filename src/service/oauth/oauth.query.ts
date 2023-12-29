import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiDetails } from '@/service/api'
import { initApiRequest } from '@/lib/api-request'
import { IChangePassword, IInitResponse } from './oauth.interface'
import { useAuth } from '@/providers'
import { handleLogout } from '@/lib/api-request/api-schema'

const {
  oauthAPI: { getInitData, changePassword },
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
  const { setIsAuthenticated } = useAuth()
  return useMutation((requestData: IChangePassword) => {
    return initApiRequest({
      apiDetails: changePassword,
      requestData,
    })
  })
}
