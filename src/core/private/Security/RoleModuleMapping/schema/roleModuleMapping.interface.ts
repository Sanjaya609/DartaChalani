export interface IRoleMappingCreate {
  moduleId: number
  resourceId: number
  roleId: number
  showModuleOnMenu: boolean
}

export interface IRoleMappingDelete {
  moduleId: StringNumber
  removeModuleAlso: boolean
  resourceId?: StringNumber
  roleId: StringNumber
}
