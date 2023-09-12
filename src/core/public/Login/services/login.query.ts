import { initApiRequest } from '@/lib/api-request'
import { privateRoutePath, useNavigate } from '@/router'
import { useMutation } from '@tanstack/react-query'
import {
  ILoginPayload,
  ILoginResponse,
} from '@/core/public/Login/interface/login.interface'
import { useAuth } from '@/providers'
import { apiDetails } from '@/service/api'
import TokenService from '@/service/token/token.service'

const useLogin = () => {
  const navigate = useNavigate()
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
