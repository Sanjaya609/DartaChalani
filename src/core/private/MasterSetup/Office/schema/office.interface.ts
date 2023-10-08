export interface IOfficeInitialValue {
  officeNameEn: string
  officeNameNP: string
  addressEn: string
  addressNp: string
  id?: number
  isActive: boolean
  wardNo: number | string
  wardNoNp: string
}

export interface IOfficeListResponse {
  officeNameEn: string
  officeNameNP: string
  addressEn: string
  addressNp: string
  id: number
  isActive: boolean
  wardNo: number | string
  wardNoNp: string
}
