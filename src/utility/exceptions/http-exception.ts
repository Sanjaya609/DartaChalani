import { ManagedAxiosError } from '@/lib/api-request/api-types'

class HttpException<
  TError = ManagedAxiosError<BackendErrorResponse<GenericObj>>
> extends Error {
  public error: TError

  public status?: number

  constructor(error: TError, status?: number) {
    super()
    this.status = status
    this.error = error
  }
}

export default HttpException
