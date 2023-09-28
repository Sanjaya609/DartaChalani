import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { privateRoutePath, useNavigate } from '@/router'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const StandingListTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<TAny>[]>(
    () => [
      {
        accessorKey: 'code',
        header: t('security.module.code'),
      },
      {
        accessorKey: 'moduleNameEnglish',
        header: t('security.module.moduleNameEnglish'),
      },

      {
        accessorKey: 'moduleNameNepali',
        header: t('security.module.moduleNameNepali'),
      },
      {
        accessorKey: 'parentModule',
        header: t('security.module.parentModuleName'),
      },
      {
        accessorKey: 'orderNumber',
        header: t('security.module.orderNumber'),
      },
      // {
      //   accessorKey: 'isActive',
      //   header: 'is Active?',
      //   cell: ({ row: { original } }) => (
      //     <Switch
      //       checked={original.isActive}
      //       onChange={() => {
      //         setOrRemoveCurrentSelectedId(original.id)
      //       }}
      //     />
      //   ),
      // },

      // {
      //   header: 'Actions',
      //   cell: ({ row: { original } }) => {
      //     const {
      //       id,
      //       moduleNameEnglish,
      //       moduleNameNepali,
      //       description,
      //       code,
      //       url,
      //       iconClass,
      //       isConfigurable,
      //       orderNumber,
      //       parentModuleId,
      //       resourceResponses,
      //     } = original
      //     return (
      //       <TableAction
      //         handleEditClick={() => {
      //           setInitialValues({
      //             id,
      //             moduleNameEnglish,
      //             moduleNameNepali,
      //             description,
      //             code,
      //             url,
      //             iconClass,
      //             isConfigurable,
      //             orderNumber,
      //             parentModuleId,
      //             resourceRequestList: resourceResponses?.length
      //               ? resourceResponses.map(
      //                   ({ httpMethod, privilege, resourceName, url, id }) => ({
      //                     id,
      //                     httpMethod,
      //                     privilege,
      //                     resourceName,
      //                     url,
      //                   })
      //                 )
      //               : [
      //                   {
      //                     httpMethod: '',
      //                     privilege: '',
      //                     resourceName: '',
      //                     url: '',
      //                   },
      //                 ],
      //           })
      //           toggleAddEditModal()
      //         }}
      //       />
      //     )
      //   },
      // },
    ],
    [t]
  )

  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('standingList.title')} />
      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(privateRoutePath.standingList.add)
              },
            }}
            className="pb-4"
            columns={columns}
            data={[]}
          />
        </FlexLayout>
      </ContainerLayout>
    </FlexLayout>
  )
}

export default StandingListTable
