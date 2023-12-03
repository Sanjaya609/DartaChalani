import { IResourceRequestList } from '@/core/private/Security/ModuleSetup/schema/moduleSetup.interface'
import { PRIVILEGEENUM } from '../enums/privilege.enum'

export const getPrivilegeFromResource = (resources: IResourceRequestList[]) =>
  resources?.reduce<Partial<Record<PRIVILEGEENUM, boolean>>>(
    (currPrivilege, resource) => {
      const mappedPrivilege = { ...currPrivilege }
      mappedPrivilege[resource.privilege as PRIVILEGEENUM] = true
      return mappedPrivilege
    },
    {}
  )
