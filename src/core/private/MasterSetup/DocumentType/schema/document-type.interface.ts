export interface IDocumentTypeInitialValue {
  id?: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  isMandatory: boolean
  maxFileSize: string | number
  moduleName: string
}

export interface IDocumentTypeResponse {
  id: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  isMandatory: boolean
  maxFileSize: string
  moduleName: string
  isActive: boolean
}
