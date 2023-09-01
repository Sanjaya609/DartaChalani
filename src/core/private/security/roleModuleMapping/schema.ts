import { OptionType } from "../../../../components/StyledSelect/StyledSelect";
import * as yup from 'yup';

export interface RoleModulePrivilegeData {
    // id?:number,
    moduleId: OptionType | null,
    resourceIds: OptionType[],
}
export interface RoleModulePrivilegePayload {
    // id?:number
    resourceIds: number[],
    roleId: number
}

export const roleModulePrivilegeInitalValue: RoleModulePrivilegeData = {
    moduleId: null,
    resourceIds: []
}

export const roleModulePrivilegeValidationSchema = yup.object({
    moduleId: yup.mixed().required(),
    resourceIds: yup.mixed().required()
})


export interface RoleModulePrivilegeReponse {
    roleId: number
    roleName: string
    roleNameNp: string
    moduleList: ModuleList[]
    resources: any
  }
  
  export interface ModuleList {
    id: number
    moduleNameEnglish: string
    moduleNameNepali: string
    code: string
    description: string
    url: string
    iconClass: string
    isConfigurable: boolean
    isActive: boolean
    resourceResponses: ResourceResponse[]
  }
  
  export interface ResourceResponse {
    id: number
    url: string
    httpMethod: string
    privilege: string
    isActive: boolean
    resourceName: string
  }