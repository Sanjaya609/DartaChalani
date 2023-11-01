import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IModuleSetupTableData,
  IResourceRequestList,
} from '../../ModuleSetup/schema/moduleSetup.interface'
import {
  IRoleMappingCreate,
  IRoleMappingDelete,
} from '../schema/roleModuleMapping.interface'

const {
  createRoleMapping,
  getAssignedModulesForRole,
  getResourceListByModuleAndRole,
  deleteRoleMapping,
} = apiDetails

const useCreateRoleMapping = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IRoleMappingCreate) => {
      return initApiRequest({
        apiDetails: createRoleMapping,
        requestData: { ...requestData },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAssignedModulesForRole.queryKeyName])
        queryClient.invalidateQueries([
          getResourceListByModuleAndRole.queryKeyName,
        ])
      },
    }
  )
}

interface IGetAssignedModulesForRole {
  roleId?: string | number
}

const useGetAssignedModulesForRole = ({
  roleId,
}: IGetAssignedModulesForRole) => {
  return useQuery(
    [getAssignedModulesForRole.queryKeyName, roleId],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleSetupTableData[]>>({
        apiDetails: getAssignedModulesForRole,
        pathVariables: { roleId },
      }),
    {
      select: (data) => data?.data?.data || [],
      enabled: !!roleId,
    }
  )
}

interface IGetResourceListByModuleAndRole {
  roleId?: string | number
  moduleId?: string | number
}

const useGetResourceListByModuleAndRole = ({
  roleId,
  moduleId,
}: IGetResourceListByModuleAndRole) => {
  return useQuery(
    [getResourceListByModuleAndRole.queryKeyName, roleId, moduleId],
    () =>
      initApiRequest<BackendSuccessResponse<IResourceRequestList[]>>({
        apiDetails: getResourceListByModuleAndRole,
        pathVariables: { roleId, moduleId },
      }),
    {
      select: (data) => data?.data?.data || [],
      enabled: !!roleId && !!moduleId,
    }
  )
}

const useDeleteRoleMapping = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (params: IRoleMappingDelete) => {
      return initApiRequest({
        apiDetails: deleteRoleMapping,
        params: { ...params },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAssignedModulesForRole.queryKeyName])
        queryClient.invalidateQueries([
          getResourceListByModuleAndRole.queryKeyName,
        ])
      },
    }
  )
}

export {
  useGetAssignedModulesForRole,
  useCreateRoleMapping,
  useGetResourceListByModuleAndRole,
  useDeleteRoleMapping,
}
