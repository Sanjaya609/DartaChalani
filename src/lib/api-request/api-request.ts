import Axios, { AxiosError, AxiosProgressEvent, AxiosResponse } from 'axios'
import { Primitive } from 'type-fest'

import {
  getAxiosParams,
  handleLogout,
  manageErrorResponse,
  refreshTokenApiDetails,
  requestRefreshToken,
  sanitizeApiController,
  transformRequestData,
} from '@/lib/api-request/api-schema'
import HttpException from '@/utility/exceptions/http-exception'

import { ApiDetailType, RequestDataType } from '@/lib/api-request/api-types'

const controller = new AbortController()

export interface InitApiRequest {
  apiDetails: ApiDetailType
  pathVariables?: { [key: string]: Primitive }
  params?: { [key: string]: Primitive | Array<GenericObj<Primitive>> }
  requestData?: RequestDataType
  signal?: AbortSignal
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}

Axios.interceptors.response.use(
  (value) => value,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      handleLogout()
    }
    if (
      error.response?.status === 401 &&
      error.config?.url !== refreshTokenApiDetails.controllerName
    ) {
      return requestRefreshToken(error)
    }
    return Promise.reject(error)
  }
)

const initApiRequest = async <TData>({
  apiDetails,
  pathVariables,
  params,
  signal,
  requestData,
  onUploadProgress,
}: InitApiRequest): Promise<AxiosResponse<TData> | undefined> => {
  let sanitizedDetails = apiDetails

  if (pathVariables)
    sanitizedDetails = sanitizeApiController(apiDetails, pathVariables)
  try {
    return await Axios.request<TData>({
      ...getAxiosParams(sanitizedDetails),
      params,
      signal: signal ?? controller.signal,
      ...transformRequestData(sanitizedDetails, requestData),
      onUploadProgress,
    })
  } catch (error) {
    throw new HttpException(
      manageErrorResponse(error as AxiosError<BackendErrorResponse<GenericObj>>)
    )
  }
}

export { initApiRequest }
