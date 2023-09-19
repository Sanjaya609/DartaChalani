import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IEmailInitialValue, IEmailResponse } from '../schema/email.interface'

const { createEmailSetup, getEmailSetup } = apiDetails

const useCreateEmailSetup = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IEmailInitialValue) => {
      return initApiRequest({
        apiDetails: createEmailSetup,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getEmailSetup.controllerName])
      },
    }
  )
}

const useGetEmailSetup = () => {
  return useQuery(
    [getEmailSetup.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IEmailResponse>>({
        apiDetails: getEmailSetup,
      }),
    {
      select: (data) => {
        return data?.data.data
      },
    }
  )
}

export { useCreateEmailSetup, useGetEmailSetup }
