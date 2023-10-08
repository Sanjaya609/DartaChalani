export interface IAddRegistrationBookInitialValue {
  id?: number
  applicationDate: string
  letterDispatchDate: string
  letterDispatchNumber: string
  letterLinks: string
  letterSenderName: string
  letterToPerson: string
  localBodyId: StringNumber
  physicalAddress: string
  registrationNumber?: string
  remarks: string
  sectorId: StringNumber
  subjectOfLetter: string
  wardNumber: StringNumber
  provinceId?: string
  districtId?: string
}

interface IDocument {
  documentTypeId: StringNumber
  guid: string
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
}
