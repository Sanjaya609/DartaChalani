export interface IRoleMappingCreate {
  moduleId: number
  resourceId?: number | null
  roleId: number
  showModuleOnMenu?: boolean
  refetchResourceList?: boolean
}

export interface IRoleMappingDelete {
  moduleId: StringNumber
  removeModuleAlso: boolean
  resourceId?: StringNumber
  roleId: StringNumber
  refetchModuleList?: boolean
}
