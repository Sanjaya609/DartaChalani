export interface IUserSetupInitialValue {
  email: string
  fullNameEn: string
  fullNameNp: string
  id?: number | null
  password?: string
  roleId: StringNumber
  username: string
}

export interface IUserSetupResponse {
  id: number
  fullNameNp: string
  fullNameEn: string
  username: string
  email: string
  isDisabled: boolean
  isCredentialsExpired: boolean
  isActiveRole: boolean
  roleId: number
  roleNameEnglish: string
  roleNameNepali: string
}
