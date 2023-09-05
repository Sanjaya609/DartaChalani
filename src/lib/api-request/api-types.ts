import { AxiosRequestConfig } from 'axios'
import { JsonObject, Primitive } from 'type-fest'

export interface RequestDataType {
  [key: string]:
    | ArrayBuffer
    | ArrayBufferView
    | File
    | Blob
    | string
    | boolean
    | number
    | null
    | Date
    | Array<unknown>
}

export enum RequestMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK',
}

export enum RequestBodyType {
  /* If request id in application/x-www-form-urlencoded as string */
  QUERY_STRING = 'QUERY-STRING',
  /* If request is in formdata */
  FORM_DATA = 'FORM-DATA',
  /* If request requires Bearer */
  AUTH = 'AUTH',
  /* If request is open */
  NO_AUTH = 'NO-AUTH',
  FILE = 'FILE',
}

export interface ApiDetailType {
  actionName?: string
  controllerName: string
  requestMethod?: RequestMethod
  requestBodyType?: RequestBodyType
  baseUrl?: string
}

export interface ApiRequestDetail {
  requestData?: RequestDataType
  pathVariables?: { [key: string]: Primitive }
  params?: { [key: string]: Primitive }
}

export interface ManagedAxiosError<Data = BackendErrorResponse<JsonObject>> {
  message: string
  data: Data
  status: number | boolean
  noconnection: boolean
  config: AxiosRequestConfig | undefined
  isAxiosError: boolean
  code?: string
}
