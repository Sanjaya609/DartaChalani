import { FormKeyType } from '@/components/functional/Form/Form'

export interface IAddFieldInitialValue {
  id: number | string
  dropDownId: string | number
  dropDownResponse?: {
    id: number
    dropDownDescriptionEn: string
    dropDownDescriptionNp: string
    dropDownDetailResponseDtoList: {
      id: number
      descriptionEn: string
      descriptionNp: string
    }[]
  }
  fieldControlName?: string
  fieldType: FormKeyType
  fieldDocumentResponse?: FieldDocumentResponseType

  isValidationRequired: boolean
  orderNo?: number
  recommendationId: string
  labelNameEnglish: string
  labelNameNepali: string
  className: string
  groupingId: number | null
  gridLength: 3 | 4 | 6 | 12 // usecase: col-span-{gridLenght}
  showInList: boolean
  value?: any
  fieldValidationList?: {
    id: number
    fieldId: number
    validationType: string
    errorMessage: string
    regex: string
  }[]
}

export interface IAddFieldPayload extends IAddFieldInitialValue {}

export interface IAddFieldResponse {
  dropDownId: string | number
  fieldControlName: string
  fieldType: FormKeyType | 'File'
  id: number
  isValidationRequired: boolean
  orderNo?: number
  recommendationId: ''
  labelNameEnglish: string
  labelNameNepali: string
  className: string
  groupingId: number | null
  gridLength: 3 | 4 | 6 | 12
  showInList: boolean
}

export interface IUpdateFieldOrder {
  fieldGroupId: number
  id: number | string
  orderNo: number
}

export interface FieldDocumentResponseType {
  documentResponse: DocumentResponse
  fieldResponse: FieldResponse
}

export interface FieldResponse {
  id: number
  fieldControlName: string
  fieldType: string
  orderNo: number
  isValidationRequired: boolean
  labelNameEnglish: string
  labelNameNepali: string
  className: string
  gridLength: number
  fieldValidationList?: any
  dropDownResponse?: any
  fieldDocumentResponse?: any
  value?: any
  showInList: boolean
}

export interface DocumentResponse {
  id: number
  documentName: string
  uuid: string
  url: string
}
