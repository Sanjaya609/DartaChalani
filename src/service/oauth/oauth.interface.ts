import { IFiscalYearResponse } from '@/core/private/MasterSetup/FiscalYear/schema/fiscalyear.interface'
import { IModuleSetupTableData } from '@/core/private/Security/ModuleSetup/schema/moduleSetup.interface'

export interface IInitResponse {
  user: IUser
  currentFiscalYear: IFiscalYearResponse
  moduleList: IModuleSetupTableData[]
}

interface IUser {
  id: number
  fullNameNp: string
  fullNameEn: string
  username: string
  email: string
  isDisabled: boolean
  isCredentialsExpired: boolean
  roleId: number
  roleNameEnglish: string
  roleNameNepali: string
  isActiveRole: boolean
  roleType: string
  isCommonRole: boolean
}

export interface IChangePassword {
  confirmNewPassword: string
  currentPassword: string
  newPassword: string
}
