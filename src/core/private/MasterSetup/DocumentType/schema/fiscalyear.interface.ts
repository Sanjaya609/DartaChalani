export interface IFiscalYearInitialValue {
  endDateAd: string
  endDateBs: string
  fiscalYearNameEn: string
  fiscalYearNameNp: string
  id?: number
  startDateAd: string
  startDateBs: string
}

export interface IFiscalYearResponse {
  id: number
  fiscalYearNameNp: string
  fiscalYearNameEn: string
  startDateBs: string
  endDateBs: string
  startDateAd: string
  endDateAd: string
  isActive: boolean
  isCurrentFiscalYear: boolean
}
