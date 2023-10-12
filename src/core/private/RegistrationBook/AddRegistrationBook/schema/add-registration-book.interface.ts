export interface IAddRegistrationBookInitialValue {
  id?: number
  // applicationDate: string
  letterDispatchDate: string
  letterDispatchNumber: string
  letterLinks: string
  letterSenderName: string
  letterToPerson: string
  localBodyId: StringNumber
  physicalAddress: string
  // registrationNumber?: string
  remarks: string
  sectorId: StringNumber
  subjectOfLetter: string
  wardNumber: StringNumber
  provinceId?: StringNumber
  districtId?: StringNumber
}

interface IDocument {
  documentTypeId: StringNumber
  uuid: string
}

export interface IAddRegistrationBookPayload
  extends Omit<IAddRegistrationBookInitialValue, 'provinceId' | 'districtId'> {
  moduleId: StringNumber
  documents: IDocument[]
}

export interface IRegistrationBookResponse {
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
  registrationBookDocumentResponseDtoList: IRegistrationBookDocumentResponseDtoList[]
}

interface IRegistrationBookDocumentResponseDtoList {
  id: number
  registrationBookId: number
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
