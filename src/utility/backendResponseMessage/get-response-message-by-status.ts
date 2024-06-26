import { ManagedAxiosError } from '@/lib/api-request'
import { HttpStatusCode } from 'axios'

export const getResponseMessageByStatus = (
  error: ManagedAxiosError<BackendErrorResponse<GenericObj<string>>>
) => {
  const { data, status } = error
  let message = ''
  if (!data?.message) {
    switch (status) {
      case HttpStatusCode.NotFound:
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.BadRequest:
        message =
          typeof data?.error === 'string'
            ? data?.error
            : 'Something went wrong, Please try again.'
        break
      default:
        return 'Please contact operator'
    }
  }
  message = message || data?.message || 'Please contact operator'
  return message
}
