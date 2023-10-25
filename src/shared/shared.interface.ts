export interface IDocumentResponse {
  id: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  maxFileSize: number
  isActive: boolean
  isMandatory: boolean
  documents: IDocument[]
}

export interface IDocument {
  id: number
  documentName: string
  uuid: string
  url: string
}
