
export interface InitDataSchema {
  user: User;
  officeName: string;
  moduleList: ModuleList[];
  subSector: unknown | null;
  currentFiscalYear: CurrentFiscalYear
  dashBoardResponse?: DashboardResponse
}

export interface DashboardResponse {
  programCount: number
  subSectorCount: number
  sectorCount: number
  sectoralReportCount: number
}

export interface User {
  id: number | null;
  fullNameEnglish: string;
  fullNameNepali: string;
  username: string;
  email: string;
  contact: string;
  roleId: number;
  roleNameEnglish: string;
  roleNameNepali: string;
  userType: string;
  isActive: boolean;
  isAccountNonLocked: boolean;
  isAccountNonExpired: boolean;
  isCredentialNonExpired: boolean;
}
export interface ModuleList {
  moduleNameCode: string
  moduleNameNepali: string
  moduleNameEnglish: string
  moduleNameDescription: string
  isConfigurable: boolean
  url: string
  icon: string
  childrenModuleList?: ChildrenModuleList[]
  privilegeList: string[]
}

export interface ChildrenModuleList {
  moduleNameCode: string
  moduleNameNepali: string
  moduleNameEnglish: string
  moduleNameDescription: string
  isConfigurable: boolean
  url: string
  icon: string
  privilegeList: string[]
  parentModuleId: number
}

export interface CurrentFiscalYear {
  id: number
  fiscalYearNameNp: string
  fiscalYearNameEn: string
  startDateBs: string
  endDateBs: string
  isActive: boolean
  isCurrentFiscalYear: boolean
}