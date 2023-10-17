import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { privateRoutePath, useNavigate } from '@/router'
import { encodeParams } from '@/utility/route-params'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IDropdownConfigResponse } from '../AddDropDownConfig/schema/dropdown-config.interface'
import { useGetAllDropdownConfig } from '../services/dropdown-config.query'

const DropdownConfigTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isFetching: getAllDropdownFetching, data: dropdownData } =
    useGetAllDropdownConfig()

  const columns = React.useMemo<ColumnDef<IDropdownConfigResponse>[]>(
    () => [
      {
        header: t('masterSetup.sector.sectorNameEnglish'),
        accessorKey: 'subSectorNameEnglish',
      },
      {
        header: t('masterSetup.sector.sectorNameEnglish'),
        accessorKey: 'subSectorNameNepali',
      },
      {
        header: t('masterSetup.sector.orderNumber'),
        accessorKey: 'orderNumber',
      },
      {
        header: t('actions'),
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <TableAction
            handleEditClick={() => {
              navigate(privateRoutePath.masterSetup.dropdownConfig.edit, {
                params: {
                  id: encodeParams(id),
                },
              })
            }}
          />
        ),
      },
    ],
    [t]
  )

  return (
    <>
      <SectionHeader title={t('masterSetup.dropdownConfig.title')} />
      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(privateRoutePath.masterSetup.dropdownConfig.add)
              },
            }}
            isLoading={getAllDropdownFetching}
            columns={columns}
            data={dropdownData || []}
          />
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

export default DropdownConfigTable
