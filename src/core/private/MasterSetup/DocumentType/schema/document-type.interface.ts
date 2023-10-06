export interface IDocumentTypeInitialValue {
  id?: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  maxFileSize: string | number
}

export interface IDocumentTypeResponse {
  id: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  maxFileSize: number
  isActive: boolean
  isMandatory: boolean
}
