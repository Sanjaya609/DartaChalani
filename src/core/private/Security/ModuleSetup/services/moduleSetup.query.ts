import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IModuleSetupFormSchema,
  IModuleSetupTableData,
} from '../schema/moduleSetup.interface'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'

const {
  createModule,
  getAllModule,
  getModuleById,
  getModuleListByStatus,
  getConfigurableModuleList,
  changeModuleStatus,
  getUnConfigurableModuleList,
  deleteModuleResource,
  getDynamicFormModuleList,
} = apiDetails

const useCreateModule = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IModuleSetupFormSchema) => {
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

const useGetAllModule = <T = IModuleSetupTableData[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllModule.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleSetupTableData[]>>({
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

const useGetModuleListByStatus = <T = IModuleSetupTableData[]>(
  isActive: boolean,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getModuleListByStatus.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleSetupTableData[]>>({
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
      enabled:
        getDataWithPropsValue && 'enabled' in getDataWithPropsValue
          ? getDataWithPropsValue.enabled
          : true,
    }
  )
}

const useGetConfigurableModuleList = <T = IModuleSetupTableData[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getConfigurableModuleList.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleSetupTableData[]>>({
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

const useGetUnConfigurableModuleList = <T = IModuleSetupTableData[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getUnConfigurableModuleList.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleSetupTableData[]>>({
        apiDetails: getUnConfigurableModuleList,
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

const useDeleteModuleResource = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: number | string) => {
      return initApiRequest({
        apiDetails: deleteModuleResource,
        pathVariables: { id },
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

const useGetDynamicFormModuleList = <T = IModuleSetupTableData[]>(
  isActive = true,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getDynamicFormModuleList.queryKeyName],
    () =>
      initApiRequest<BackendSuccessResponse<IModuleSetupTableData[]>>({
        apiDetails: getDynamicFormModuleList,
        pathVariables: { isActive },
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
  useGetUnConfigurableModuleList,
  useDeleteModuleResource,
  useGetDynamicFormModuleList,
}
