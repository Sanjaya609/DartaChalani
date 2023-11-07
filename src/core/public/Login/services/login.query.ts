import {
  ILoginPayload,
  ILoginResponse,
} from '@/core/public/Login/schema/login.interface'
import { initApiRequest } from '@/lib/api-request'
import { useAuth } from '@/providers'
import { apiDetails } from '@/service/api'
import TokenService from '@/service/token/token.service'
import { useMutation } from '@tanstack/react-query'

const useLogin = () => {
  const { setIsAuthenticated } = useAuth()
  return useMutation(
    (requestData: ILoginPayload) => {
      return initApiRequest<ILoginResponse>({
        apiDetails: apiDetails.oauthAPI.login,
        requestData: { ...requestData },
      })
    },
    {
      onSuccess: (response) => {
        if (response?.data) {
          const responseData = response.data
          TokenService.setToken(responseData.access_token)
          TokenService.setRefeshToken(responseData.refresh_token)
          setIsAuthenticated(true)
        }
      },
    }
  )
}

export { useLogin }
