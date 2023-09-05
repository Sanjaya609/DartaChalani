import { Mutation, MutationMeta, Query } from '@tanstack/query-core'
import { AxiosResponse } from 'axios'

import HttpException from '@/utility/exceptions/http-exception'
import { getResponseMessageByStatus } from '@/utility/backendResponseMessage/get-response-message-by-status'
import toast, {
  ToastType,
} from '@/components/functional/ToastNotifier/ToastNotifier'

const type = ToastType.error

const message = {
  FILE_SIZE: 'Please Upload the file less than 12 MB.',
  LONG_TO_RESPOND:
    'Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!',
  SERVER_NOT_REACHED: 'Server could not be reached',
}

let timeoutMessageCount = 0
let noServerConnectionMessageCount = 0
let longToRespondMessageCount = 0

const onError = (httpException: HttpException, disableFailureToast = false) => {
  const { error } = httpException
  const toastMessage = getResponseMessageByStatus(error)
  if (error.status === 413) toast({ message: message.FILE_SIZE, type })

  if (!disableFailureToast) toast({ message: toastMessage, type })

  // Axios Timeout
  if (error.code === 'ECONNABORTED' && !timeoutMessageCount) {
    timeoutMessageCount += timeoutMessageCount
    toast({ message: message.SERVER_NOT_REACHED, type })
  }

  if (error.noconnection) {
    // No Server Connection
    if (error.code !== 'ECONNABORTED' && !longToRespondMessageCount) {
      longToRespondMessageCount += longToRespondMessageCount
      toast({ message: message.LONG_TO_RESPOND, type })
    }

    // No Connection
    if (
      error.message === message.SERVER_NOT_REACHED &&
      !noServerConnectionMessageCount
    ) {
      noServerConnectionMessageCount += noServerConnectionMessageCount
      toast({ message: message.SERVER_NOT_REACHED, type })
    }
  }
}

const onQueryError = (responseError: unknown, query: Query) => {
  onError(responseError as HttpException, query.meta?.disableFailureToast)
}

const onMutationError = async (
  responseError: unknown,
  variables: unknown,
  context: unknown,
  mutation: Mutation<unknown, unknown, unknown>
) => {
  onError(responseError as HttpException, mutation.meta?.disableFailureToast)
}

const onMutationSuccess = (
  responseData: unknown,
  variables: unknown,
  context: unknown,
  query: Mutation<unknown, unknown, unknown>
) => {
  if (
    (query.meta as MutationMeta)?.disableSuccessToast ||
    ['GET', 'get'].includes(
      (responseData as AxiosResponse<BackendSuccessResponse<GenericObj>>).config
        .method || ''
    )
  )
    return

  const data = (
    responseData as AxiosResponse<BackendSuccessResponse<GenericObj>>
  )?.data
  toast({ message: data?.message, type: ToastType.success })
}

export { onQueryError, onMutationError, onMutationSuccess }
