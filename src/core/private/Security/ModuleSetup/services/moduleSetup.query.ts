import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ModuleSetupFormSchema,
  ModuleSetupTableData,
} from '../schema/moduleSetup.interface'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'

const {
  createModule,
  getAllModule,
  getModuleById,
  getModuleListByStatus,
  getConfigurableModuleList,
  changeModuleStatus,
} = apiDetails

const useCreateModule = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: ModuleSetupFormSchema) => {
      return initApiRequest({
        apiDetails: createModule,
        requestData: { ...requestData },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllModule.queryKeyName])
      },
    }
  )
}

const useGetAllModule = <T = ModuleSetupTableData[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllModule.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<ModuleSetupTableData[]>>({
        apiDetails: getAllModule,
      }),
    {
      select: (data) => {
        const moduleListData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: moduleListData,
                id: 'id',
                name: 'moduleNameEnglish',
                nameNp: 'moduleNameNepali',
              })
            : moduleListData
        ) as T
      },
    }
  )
}

const useChangeModuleStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { moduleId: number | string }) => {
      return initApiRequest({
        apiDetails: changeModuleStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllModule.queryKeyName])
        queryClient.invalidateQueries([getModuleListByStatus.queryKeyName])
      },
    }
  )
}

const useGetModuleById = (moduleId: string | number) => {
  return useQuery(
    [getModuleById.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<unknown[]>>({
        apiDetails: getModuleById,
        pathVariables: { moduleId },
      }),
    {
      select: (data) => {
        return data?.data?.data
      },
    }
  )
}

const useGetModuleListByStatus = <T = ModuleSetupTableData[]>(
  isActive: boolean,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getModuleListByStatus.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<ModuleSetupTableData[]>>({
        apiDetails: getModuleListByStatus,
        pathVariables: { isActive },
      }),
    {
      select: (data) => {
        const moduleData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: moduleData,
                id: 'id',
                name: 'moduleNameEnglish',
                nameNp: 'moduleNameNepali',
              })
            : moduleData
        ) as T
      },
    }
  )
}

const useGetConfigurableModuleList = <T = ModuleSetupTableData[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getConfigurableModuleList.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<ModuleSetupTableData[]>>({
        apiDetails: getConfigurableModuleList,
      }),
    {
      select: (data) => {
        const moduleListData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: moduleListData,
                id: 'id',
                name: 'moduleNameEnglish',
                nameNp: 'moduleNameNepali',
              })
            : moduleListData
        ) as T
      },
    }
  )
}

export {
  useCreateModule,
  useGetAllModule,
  useChangeModuleStatus,
  useGetModuleById,
  useGetModuleListByStatus,
  useGetConfigurableModuleList,
}
