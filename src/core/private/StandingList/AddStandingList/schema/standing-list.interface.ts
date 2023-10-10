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
  guid: string
}

export interface IStandingListPayload
  extends Omit<IStandingListInitialValue, 'provinceId' | 'districtId'> {
  moduleId: StringNumber
  documents: IDocument[]
}

export interface IStandingListResponse {
  id: number
  registrationNumber: string
  applicationDate: string
  letterSenderName: string
  letterDispatchDate: string
  letterDispatchNumber: string
  wardNumber: number
  subjectOfLetter: string
  letterToPerson: string
  physicalAddress: string
  remarks: string
  letterLinks: string
  sectorId: number
  sectorNameNepali: string
  sectorNameEnglish: string
  locationDataResponse: ILocationDataResponse
  StandingListDocumentResponseDtoList: IStandingListDocumentResponseDtoList[]
}

interface IStandingListDocumentResponseDtoList {
  id: number
  StandingListId: number
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
