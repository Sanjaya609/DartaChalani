export interface RoleSetupFormSchema {
    id?: number
    roleNameEnglish: string
    roleNameNepali: string
    roleType: string
    description: string
}

export interface RoleSetupTableData {
    id: number
    roleNameEnglish: string
    roleNameNepali: string
    description: string
    isActive: boolean
    roleType: string
}
