import { IDocumentResponse } from '@/shared/shared.interface'

export interface IStandingListInitialValue {
  address: string
  applicationDate: string
  contactNumber: string
  contactPersonName: string
  firmRegistrationNumber: string
  id?: number
  letter_no: StringNumber
  localBodyId: StringNumber
  provinceId: StringNumber
  districtId: StringNumber
  panOrVatNumber: string
  panOrVatRegistrationDate: string
  personOrFirmName: string
  registrationDate: string
  serviceTypeId: StringNumber
  taxClearanceDate: string
  taxClearanceDateExtendedDate: string
  wardNumber: StringNumber
  workingSectorDetails: string
}

interface IDocument {
  documentTypeId: StringNumber
  uuid: string
}

export interface IStandingListPayload
  extends Omit<
    IStandingListInitialValue,
    'provinceId' | 'districtId' | 'applicationDate' | 'registrationDate'
  > {
  moduleId?: StringNumber
  documents: IDocument[]
}

export interface IStandingListResponse {
  id: number
  letter_no: number
  registrationDate: string
  personOrFirmName: string
  address: string
  contactPersonName: string
  contactNumber: string
  applicationDate: string
  firmRegistrationNumber: string
  panOrVatNumber: string
  workingSectorDetails: string
  panOrVatRegistrationDate: string
  taxClearanceDate: string
  taxClearanceDateExtendedDate: string
  serviceTypeId: number
  serviceTypeNameNp: string
  serviceTypeNameEn: string
  isActiveServiceType: boolean
  documentList: IDocumentResponse[]
  locationDataResponse: ILocationDataResponse
  wardNumber: StringNumber
}

interface IStandingListDocumentResponseDtoList {
  id: number
  standingListId: number
  documentTypeId: number
  documentName: string
  uuid: string
  url: string
}

interface ILocationDataResponse {
  provinceId: StringNumber
  provinceNameEn: string
  provinceNameNp: string
  districtId: StringNumber
  districtNameEn: string
  districtNameNp: string
  localBodyId: StringNumber
  localBodyNameEn: string
  localBodyNameNp: string
  totalWards: StringNumber
}
