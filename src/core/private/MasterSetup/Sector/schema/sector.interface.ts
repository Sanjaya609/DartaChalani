export interface ISectorInitialValue {
  sectorNameEnglish: string
  sectorNameNepali: string
  orderNumber: string | number
  id?: number
}

export interface ISectorResponse {
  id: number
  subSectorNameEnglish: string
  subSectorNameNepali: string
  orderNumber: string
  isActive: boolean
}
