import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RoleSetupFormSchema, RoleSetupTableData } from '../schema/roleSetup.interface'

const { createRole, getAllRole, changeRoleStatus } = apiDetails

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

const useGetAllRole = () => {
    return useQuery(
        [getAllRole.queryKeyName],
        () =>
            initApiRequest<BackendSuccessResponse<RoleSetupTableData[]>>({
                apiDetails: getAllRole,
            }),
        {
            select: (data) => {
                // const fiscalYearData = data?.data?.data?.length ? data.data.data : []
                // return (
                //     getDataWithPropsValue?.mapDatatoStyleSelect
                //         ? mapDataToStyledSelect({
                //             arrayData: fiscalYearData,
                //             id: 'id',
                //             name: 'fiscalYearNameEn',
                //             nameNp: 'fiscalYearNameNp',
                //         })
                //         : fiscalYearData
                // ) as T
                return data?.data?.data
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

export { useGetAllRole, useCreateRole, useChangeRoleStatus }
