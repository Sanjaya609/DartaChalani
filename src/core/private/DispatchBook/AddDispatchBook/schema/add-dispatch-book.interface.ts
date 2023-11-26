import { IDocumentResponse } from '@/shared/shared.interface'

export interface IAddDispatchBookInitialValue {
  id?: number
  letterNumber: string | number
  dispatchNumber: string | number
  letterDate: string
  subjectOfLetter: string
  letterReceiverName: string
  letterReceiverEmail: string
  letterReceiverAddress: string
  letterCarrierName: string
  letterCarrierContact: string
  letterToSection: string
  physicalFileLocation: string
  remarks: string
  localBodyId: StringNumber
  wardNumber: StringNumber
  provinceId?: StringNumber
  districtId?: StringNumber
}

interface IDocument {
  documentTypeId: StringNumber
  uuid: string
}

export interface IAddDispatchBookPayload
  extends Omit<IAddDispatchBookInitialValue, 'provinceId' | 'districtId'> {
  documents: IDocument[]
}

export interface IDispatchBookResponse {
  id: number
  letterNumber: string
  dispatchNumber: string
  dispatchDate: string
  letterDate: string
  subjectOfLetter: string
  letterReceiverName: string
  letterReceiverEmail: string
  letterReceiverAddress: string
  letterCarrierName: string
  letterCarrierContact: string
  letterToSection: string
  physicalFileLocation: string
  remarks: string
  locationDataResponse: ILocationDataResponse
  wardNumber: number
  documentList: IDocumentResponse[]
}

interface IDispatchBookDocumentResponseDtoList {
  id: number
  dispatchBookId: number
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
