import { useParams } from '@/router'
import { decodeParams } from '@/utility/route-params'
import { useMemo } from 'react'

export interface IRoleDataParams {
  id: string | number
  roleNameEnglish: string
  roleNameNepali: string
}

const useGetRoleMappingParamsData = () => {
  const params = useParams()
  const roleData = useMemo<IRoleDataParams>(
    () => (decodeParams(params.roleData) as IRoleDataParams) || null,
    []
  )

  return roleData
}

export default useGetRoleMappingParamsData
