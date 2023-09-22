export interface IDocumentTypeInitialValue {
  id?: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  isMandatory: boolean
  maxFileSize: string | number
  moduleId: string | number
}

export interface IDocumentTypeResponse {
  id: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  maxFileSize: number
  isMandatory: boolean
  isActive: boolean
  moduleId: number
  moduleNameEnglish: string
  moduleNameNepali: string
  moduleCode: string
  moduleDescription: string
  moduleUrl: string
  isConfigurableModule: boolean
  isActiveModule: boolean
}
