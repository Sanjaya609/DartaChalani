import { IDocumentResponse } from '@/shared/shared.interface'

export interface IAddRecommendationInitialValue {
  id?: number
  remarks: string
}

interface IDocument {
  documentTypeId: StringNumber
  uuid: string
}

export interface IAddRecommendationPayload
  extends Omit<IAddRecommendationInitialValue, 'provinceId' | 'districtId'> {
  // moduleId: StringNumber
  documents: IDocument[]
}

export interface IRecommendationResponse {
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
  documentList: IDocumentResponse[]
}
