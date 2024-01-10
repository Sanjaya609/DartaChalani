export interface IResourceRequestList {
  httpMethod: string
  id?: number
  isActive?: boolean
  privilege: string
  resourceName: string
  url: string
  isAssignedToRole?: boolean
}

export interface IModuleSetupFormSchema {
  code: string
  description: string
  iconClass: string
  id?: number
  isConfigurable: boolean
  moduleNameEnglish: string
  moduleNameNepali: string
  orderNumber: StringNumber
  parentModuleId?: StringNumber | null
  resourceRequestList: IResourceRequestList[]
  url: string
  dynamicFormApplicable: boolean
}

export interface IModuleSetupTableData {
  id: number
  moduleNameEnglish: string
  moduleNameNepali: string
  code: string
  description: string
  url: string
  iconClass: string
  isConfigurable: boolean
  orderNumber: StringNumber
  isActive: boolean
  resourceResponses: IResourceRequestList[]
  parentModuleId?: StringNumber
  showModuleOnMenu?: boolean
  childModuleList?: IModuleSetupTableData[]
  dynamicField: boolean
}
