export interface DashboardResponse {
    sectorWiseExpense: DashboardReponseObject[]
    fiscalYearWiseTotalExpense: DashboardReponseObject[]
    subSectorWiseExpenseSource: DashboardReponseObject[]
    programCount: string | number
    sectorCount: string | number
    sectoralReportCount: string | number
    subSectorCount: string | number
}

export interface DashboardReponseObject {
    keyNp: string
    keyEn: string
    amount: number
}
