import { useQuery } from '@tanstack/react-query'
import { apiDetails } from '@/service/api'
import { initApiRequest } from '@/lib/api-request'
import { IInitResponse } from './oauth.interface'

const {
  oauthAPI: { getInitData },
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
