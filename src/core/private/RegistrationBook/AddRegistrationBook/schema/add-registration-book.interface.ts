export interface IAddRegistrationBookInitialValue {
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
