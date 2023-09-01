import { OptionType } from "../../../../components/StyledSelect/StyledSelect"
import * as yup from 'yup';
export interface ResourseSchema {
  httpMethod: string,
  id: number,
  isActive: boolean,
  privilege: string,
  resourceName: string,
  url: string
}

export interface ResourseData {
  httpMethod: OptionType | null,
  id?: number,
  isActive: boolean,
  privilege: OptionType | null,
  resourceName: string,
  url: string
}
export interface ResoursePayload {
  httpMethod: string,
  id?: number,
  isActive: boolean,
  privilege: string,
  resourceName: string,
  url: string
}
export const initalResourceData: ResourseData = {
  httpMethod: null,
  isActive: true,
  privilege: null,
  resourceName: '',
  url: ''
}

export const resourceFormValidationSchema=yup.object({
  httpMethod: yup.string().required(),
  privilege: yup.string().required(),
  resourceName: yup.string().required(),
  url: yup.string().required()
})
export enum Privilege {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  READ_LIST = "READ_LIST",
  FORWARD = "FORWARD",
  VERIFY = "VERIFY",
  SUBMIT = "SUBMIT",
  APPROVE = "APPROVE",
  BACK_FOR_REVIEW = "BACK_FOR_REVIEW",
  REJECT = "REJECT"
}

export enum httpMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}