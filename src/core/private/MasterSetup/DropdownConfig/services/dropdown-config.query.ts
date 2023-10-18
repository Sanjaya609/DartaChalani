import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IDropdownConfigInitialValue,
  IDropdownConfigResponse,
} from '../AddDropDownConfig/schema/dropdown-config.interface'

const { createDropdownConfig, getAllDropdownConfig, getDropdownConfigById } =
  apiDetails

const useCreateDropdownConfig = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IDropdownConfigInitialValue) => {
      return initApiRequest({
        apiDetails: createDropdownConfig,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllDropdownConfig.controllerName])
      },
    }
  )
}

const useGetAllDropdownConfig = <T = IDropdownConfigResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllDropdownConfig.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IDropdownConfigResponse[]>>({
        apiDetails: getAllDropdownConfig,
      }),
    {
      select: (data) => {
        const fiscalYearData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: fiscalYearData,
                id: 'id',
                name: 'dropDownDescriptionEn',
                nameNp: 'dropDownDescriptionNp',
              })
            : fiscalYearData
        ) as T
      },
    }
  )
}

const useGetDropdownConfigById = (dropdownConfigId?: string | number) => {
  return useQuery(
    [getDropdownConfigById.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IDropdownConfigResponse>>({
        apiDetails: getDropdownConfigById,
        pathVariables: {
          dropdownConfigId,
        },
      }),
    {
      select: (data) => {
        return data?.data?.data
      },
      enabled: !!dropdownConfigId,
    }
  )
}

export {
  useGetDropdownConfigById,
  useCreateDropdownConfig,
  useGetAllDropdownConfig,
}
