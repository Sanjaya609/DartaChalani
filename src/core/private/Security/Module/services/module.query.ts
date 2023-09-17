import { useQuery } from '@tanstack/react-query'
import { IGetAllModuleResponse } from '../schema/module.interface'
import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'

const { getAllModuleList } = apiDetails

const useGetAllModuleList = <T = IGetAllModuleResponse[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllModuleList.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IGetAllModuleResponse[]>>({
        apiDetails: getAllModuleList,
      }),
    {
      select: (data) => {
        const fiscalYearData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: fiscalYearData,
                id: 'id',
                name: 'moduleNameEnglish',
                nameNp: 'moduleNameNepali',
              })
            : fiscalYearData
        ) as T
      },
    }
  )
}

export { useGetAllModuleList }
