import Axios, {
  AxiosBasicCredentials,
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders,
} from 'axios'
import { JsonObject, Primitive } from 'type-fest'

// import { ILoginResponse } from '@/core/public/Login/schema/login.interface'
import {
  ApiDetailType,
  ManagedAxiosError,
  RequestBodyType,
  RequestDataType,
  RequestMethod,
} from '@/lib/api-request/api-types'
import TokenService from '@/service/token/token.service'
import { pathParamSanitizer } from '@/utility/sanitizer/sanitizer'

export const basicAuth: AxiosBasicCredentials = {
  username: 'my-username',
  password: 'test',
}

interface TransformedRequestData {
  auth?: AxiosBasicCredentials
  data: unknown
}

export const handleLogout = () => {
  TokenService.clearToken()
  window.location.replace('/')
}

function getQueryString(data: GenericObj) {
  return new URLSearchParams(data)
}

export const sanitizeApiController = (
  apiDetail: ApiDetailType,
  pathVariables?: { [key: string]: Primitive }
): ApiDetailType => {
  if (!pathVariables || !Object.keys(pathVariables).length) return apiDetail
  return {
    ...apiDetail,
    controllerName: pathParamSanitizer(
      apiDetail.controllerName,
      pathVariables,
      '{}'
    ),
  }
}
// const tokens = `${basicAuth.Username}:${basicAuth.Password}`;
// const encodedToken = Buffer.from(basicAuth).toString('base64');
export const getRequestHeaders = (apiDetails: ApiDetailType) => {
  const token = TokenService.getAccessToken()

  let headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    'Accept-Language':
      localStorage.getItem('i18nextLng') === 'ne' ? 'np-NP' : 'en-EN',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  switch (apiDetails.requestBodyType) {
    case 'AUTH':
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data',
        // 'Authorization':`Basic ${ JSON.stringify(encodedToken)}`
      }
      break
    case 'QUERY-STRING':
      headers = {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      break
    case 'FORM-DATA':
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data',
      }
      break
    case 'NO-AUTH':
      delete headers.Authorization
      break
    default:
      headers = { ...headers }
  }
  // console.log(headers,'headers')
  return headers
}

export const getFormData = (requestData: RequestDataType) => {
  const formData = new FormData()
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const data in requestData) {
    const requestDataPair = requestData[data]
    if (Array.isArray(requestDataPair)) {
      requestDataPair.forEach((dataEl, index: number) => {
        if (
          dataEl instanceof Object &&
          !(dataEl instanceof File || dataEl instanceof Blob)
        ) {
          Object.keys(dataEl).forEach((elKey) =>
            formData.append(`${data}[${index}].${elKey}`, dataEl[elKey])
          )
        } else if (dataEl instanceof File) {
          // formData.append(data, dataEl);
          formData.append(`${data}[${index}]`, dataEl)
        } else if (typeof dataEl === 'number' || typeof dataEl === 'string') {
          formData.append(`${data}[${index}]`, dataEl.toString())
        }
      })
    } else if (
      requestData[data] instanceof Object &&
      !(requestData[data] instanceof File) &&
      !(requestData[data] instanceof Blob)
    ) {
      // Object.entries(requestData[data]).forEach(([key, value]) =>
      //   formData.append(`${data}.${key}`, value)
      // )
    } else {
      formData.append(data, requestData[data] as string)
    }
  }
  return formData
}

export const transformRequestData = (
  apiDetails: ApiDetailType,
  requestData?: RequestDataType
) => {
  if (!requestData) return {}
  const transformedRequestData: TransformedRequestData = { data: requestData }

  switch (apiDetails.requestBodyType) {
    case 'AUTH':
      transformedRequestData.auth = basicAuth
      transformedRequestData.data = getFormData(requestData)
      break
    case 'NO-AUTH':
      transformedRequestData.auth = basicAuth
      transformedRequestData.data = requestData
      break
    case 'FORM-DATA':
      transformedRequestData.data = getFormData(requestData)
      break
    case 'QUERY-STRING':
      transformedRequestData.data = getQueryString(requestData as GenericObj)
      break
    default:
      transformedRequestData.data = requestData
      break
  }
  return transformedRequestData
}

export const manageErrorResponse = (
  error: AxiosError<BackendErrorResponse<JsonObject>>
): ManagedAxiosError => {
  const { message, config, request, response, isAxiosError } = error
  const errorResponse = {
    message, // Something happened in setting up the request that triggered an Error
    data: response?.data as unknown as BackendErrorResponse<JsonObject>,
    status: response?.status || false,
    noconnection: false,
    config, // Request Params Configs
    isAxiosError, // If Axios Error
  }
  if (response) {
    errorResponse.data = {
      ...response.data,
      success: false,
    } // The server responded with a status code and data
  } else if (request) {
    errorResponse.message = 'Server could not be reached.' // No response was received
    errorResponse.noconnection = true
  }

  return errorResponse
}

export const getAxiosParams = (apiDetails: ApiDetailType) => {
  const axiosRequestParams: AxiosRequestConfig = {
    baseURL: apiDetails.baseUrl ?? import.meta.env.VITE_API_ENDPOINT,
    url: apiDetails.controllerName,
    method: apiDetails.requestMethod || RequestMethod.GET,
    responseType: 'json',
    timeout: 60 * 3 * 1000,
    headers: apiDetails ? getRequestHeaders(apiDetails) : {},
  }
  if (apiDetails.requestBodyType === RequestBodyType.FILE)
    axiosRequestParams.responseType = 'blob'

  return axiosRequestParams
}

/*
 * Refresh Token Implementation
 */
interface QueueItem {
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}

let isTokenRefreshing = false

// all the failed api queue's, while token is being refreshed
let failedQueue: QueueItem[] = []

const abortController = new AbortController()

const processFailedRequest = (token: string) => {
  failedQueue.forEach(({ resolve }) => {
    resolve(token)
  })
  failedQueue = []
}

export const refreshTokenApiDetails: ApiDetailType = {
  controllerName: 'auth/api/ocr-login',
  requestMethod: RequestMethod.POST,
  requestBodyType: RequestBodyType.AUTH,
}

export const requestRefreshToken = async (error: AxiosError) => {
  const errorResponse = error.response

  if (!errorResponse || errorResponse.status !== 401)
    return Promise.reject(error)

  const newRequest = { ...errorResponse.config }

  if (isTokenRefreshing) {
    /*
     * if the token is refreshing, we queue the request so that,
     * those can be executed after the token is refreshed
     */
    return new Promise((resolve, reject) => {
      failedQueue.push({ reject, resolve })
    })
      .then((token) => {
        Object.assign(newRequest.headers ?? {}, {
          Authorization: `Bearer ${token}`,
        })
        return Axios.request(newRequest)
      })
      .catch((err) => {
        Promise.reject(err)
      })
  }

  isTokenRefreshing = true

  try {
    const response = await Axios.request<any>({
      ...getAxiosParams(refreshTokenApiDetails),
      signal: abortController.signal,
      data: {
        refresh_token: TokenService.getRefreshToken(),
        grant_type: 'refresh_token',
      },
      auth: basicAuth,
    })

    if (response?.data) {
      TokenService.setToken(response.data.access_token)
      processFailedRequest(response.data.access_token)
      failedQueue = []
      isTokenRefreshing = false
      newRequest.headers = {
        Authorization: `Bearer ${response.data.access_token}`,
      } as unknown as AxiosRequestHeaders
      Object.assign(newRequest.headers ?? {}, {
        Authorization: `Bearer ${response.data.access_token}`,
      })
      return await Axios.request(newRequest)
    }
  } catch (err) {
    if ((error as AxiosError)?.response?.status === 401) {
      handleLogout()
    }
    return Promise.reject(err)
  }
}
