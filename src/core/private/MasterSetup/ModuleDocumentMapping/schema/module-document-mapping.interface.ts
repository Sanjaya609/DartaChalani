export interface IModuleDocumentMappingInitialValue {
  id?: number
  documentTypeId: StringNumber
  isMandatory: boolean
  moduleId: StringNumber
}

export interface IModuleDocumentMappingResponse {
  id: number
  isMandatory: boolean
  documentTypeResponse: IDocumentTypeResponse
  moduleResponse: IModuleResponse
}

interface IModuleResponse {
  id: number
  moduleNameEnglish: string
  moduleNameNepali: string
  code: string
  description: string
  url: string
  iconClass: string
  isConfigurable: boolean
  orderNumber: number
  isActive: boolean
  resourceResponses: IResourceResponse[]
}

interface IResourceResponse {
  id: number
  url: string
  httpMethod: string
  privilege: string
  isActive: boolean
  resourceName: string
}

interface IDocumentTypeResponse {
  id: number
  documentTypeEn: string
  documentTypeNp: string
  allowedFileTypes: string[]
  maxFileSize: number
  isMandatory?: any
  isActive: boolean
}
