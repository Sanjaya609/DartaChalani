import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  RoleSetupFormSchema,
  RoleSetupTableData,
} from '../schema/roleSetup.interface'

const { createRole, getAllRole, changeRoleStatus, getAllActiveRole } =
  apiDetails

const useCreateRole = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: RoleSetupFormSchema) => {
      return initApiRequest({
        apiDetails: createRole,
        requestData: { ...requestData },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllRole.queryKeyName])
      },
    }
  )
}

const useGetAllRole = <T = RoleSetupTableData[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllRole.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<RoleSetupTableData[]>>({
        apiDetails: getAllRole,
      }),
    {
      select: (data) => {
        const roleData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: roleData,
                id: 'id',
                name: 'roleNameEnglish',
                nameNp: 'roleNameNepali',
              })
            : roleData
        ) as T
      },
    }
  )
}

const useGetAllActiveRole = <T = RoleSetupTableData[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllActiveRole.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<RoleSetupTableData[]>>({
        apiDetails: getAllActiveRole,
      }),
    {
      select: (data) => {
        const roleData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: roleData,
                id: 'id',
                name: 'roleNameEnglish',
                nameNp: 'roleNameNepali',
              })
            : roleData
        ) as T
      },
    }
  )
}

const useChangeRoleStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { roleId: number | string }) => {
      return initApiRequest({
        apiDetails: changeRoleStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllRole.queryKeyName])
      },
    }
  )
}

export {
  useGetAllRole,
  useCreateRole,
  useChangeRoleStatus,
  useGetAllActiveRole,
}
