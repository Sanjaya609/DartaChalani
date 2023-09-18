export interface ModuleSetupFormSchema {
    code: string
    description: string
    iconClass: string
    id?: number
    isConfigurable: boolean
    moduleNameEnglish: string
    moduleNameNepali: string
    orderNumber: number
    parentModuleId?: any
    resourceIds?: number[]
    url: string
}

export interface ModuleSetupTableData {
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
    resourceResponses: any[]
}