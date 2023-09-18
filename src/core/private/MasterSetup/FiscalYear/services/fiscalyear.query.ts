import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IFiscalYearInitialValue,
  IFiscalYearResponse,
} from '../schema/fiscalyear.interface'

const {
  getAllFiscalYear,
  changeFiscalYearStatus,
  createFiscalYear,
  switchCurrentFiscalYear,
} = apiDetails

const useCreateFiscalYear = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IFiscalYearInitialValue) => {
      return initApiRequest({
        apiDetails: createFiscalYear,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllFiscalYear.controllerName])
      },
    }
  )
}

const useGetAllFiscalYear = <T = IFiscalYearResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllFiscalYear.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IFiscalYearResponse[]>>({
        apiDetails: getAllFiscalYear,
      }),
    {
      select: (data) => {
        const fiscalYearData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
              arrayData: fiscalYearData,
              id: 'id',
              name: 'fiscalYearNameEn',
              nameNp: 'fiscalYearNameNp',
            })
            : fiscalYearData
        ) as T
      },
    }
  )
}

const useChangeFiscalYearStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { fiscalYearId: number | string }) => {
      return initApiRequest({
        apiDetails: changeFiscalYearStatus,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllFiscalYear.controllerName])
      },
    }
  )
}

const useSwitchCurrentFiscalYear = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (pathVariables: { fiscalYearId: number | string }) => {
      return initApiRequest({
        apiDetails: switchCurrentFiscalYear,
        pathVariables,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllFiscalYear.controllerName])
      },
    }
  )
}

export {
  useCreateFiscalYear,
  useGetAllFiscalYear,
  useChangeFiscalYearStatus,
  useSwitchCurrentFiscalYear,
}
