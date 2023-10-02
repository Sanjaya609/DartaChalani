import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IAddRegistrationBookInitialValue } from '../schema/add-registration-book.interface'

const {
  createRegistrationBook,
  getAllRegistrationBook,
  changeRegistrationBookStatus,
} = apiDetails

const useCreateRegistrationBook = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddRegistrationBookInitialValue) => {
      return initApiRequest({
        apiDetails: createRegistrationBook,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllRegistrationBook.controllerName])
      },
    }
  )
}

const useGetAllRegistrationBook = <T = IAddRegistrationBookInitialValue[]>(
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [getAllRegistrationBook.controllerName],
    () =>
      initApiRequest<
        BackendSuccessResponse<IAddRegistrationBookInitialValue[]>
      >({
        apiDetails: getAllRegistrationBook,
      }),
    {
      select: (data) => {
        const registrationBookData = data?.data?.data?.length
          ? data.data.data
          : []
        return registrationBookData as T
        // return (
        //   getDataWithPropsValue?.mapDatatoStyleSelect
        //     ? mapDataToStyledSelect({
        //         arrayData: fiscalYearData,
        //         id: 'id',
        //         name: 'nameEn',
        //         nameNp: 'nameNp',
        //       })
        //     : fiscalYearData
        // ) as T
      },
    }
  )
}

// const useChangeServiceTypeStatus = () => {
//   const queryClient = useQueryClient()
//   return useMutation(
//     (pathVariables: { serviceTypeId: number | string }) => {
//       return initApiRequest({
//         apiDetails: changeServiceTypeStatus,
//         pathVariables,
//       })
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries([getAllServiceType.controllerName])
//       },
//     }
//   )
// }

export { useCreateRegistrationBook, useGetAllRegistrationBook }
