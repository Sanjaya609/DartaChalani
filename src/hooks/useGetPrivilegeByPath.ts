import { useAuth } from '@/providers'
import { RoutePaths } from '@/router'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

export const defaultPrivilegeEnum = (
  Object.keys(PRIVILEGEENUM).map((privilege) => privilege) as PRIVILEGEENUM[]
).reduce((currPrivilege, privilege) => {
  const mappedPrivilege = { ...currPrivilege }
  mappedPrivilege[privilege] = false
  return mappedPrivilege
}, {} as Record<PRIVILEGEENUM, boolean>)

const useGetPrivilegeByPath = (pathName: RoutePaths) => {
  const { flatModulePropsFromURL } = useAuth()
  const routePrivilege = flatModulePropsFromURL?.[pathName]?.resourceResponses
    ? flatModulePropsFromURL?.[pathName]?.resourceResponses?.reduce<
        Record<PRIVILEGEENUM, boolean>
      >((currPrivilege, resource) => {
        const mappedPrivilege = { ...currPrivilege }
        mappedPrivilege[resource.privilege as PRIVILEGEENUM] = true
        return mappedPrivilege
      }, defaultPrivilegeEnum)
    : defaultPrivilegeEnum

  return routePrivilege
}

export default useGetPrivilegeByPath
