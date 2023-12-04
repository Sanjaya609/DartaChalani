import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate } from '@/router'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { encodeParams } from '@/utility/route-params'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IDropdownConfigResponse } from '../AddDropDownConfig/schema/dropdown-config.interface'
import { useGetAllDropdownConfig } from '../services/dropdown-config.query'

const DropdownConfigTable = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isFetching: getAllDropdownFetching, data: dropdownData } =
    useGetAllDropdownConfig()

  const columns = React.useMemo<ColumnDef<IDropdownConfigResponse>[]>(
    () => [
      {
        header: t('masterSetup.dropdownConfig.dropDownCode'),
        accessorKey: 'dropDownCode',
      },
      {
        header: t('masterSetup.dropdownConfig.dropDownDescriptionEn'),
        accessorKey: 'dropDownDescriptionEn',
      },
      {
        header: t('masterSetup.dropdownConfig.dropDownDescriptionNp'),
        accessorKey: 'dropDownDescriptionNp',
      },
      {
        header: t('masterSetup.dropdownConfig.numberOfValue'),
        accessorKey: 'dropDownDetailResponseDtoList',
        cell: ({
          row: {
            original: { dropDownDetailResponseDtoList },
          },
        }) => {
          return dropDownDetailResponseDtoList.length
        },
      },
      {
        header: t('actions'),
        sticky: 'right',
        id: 'action',
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
      <SectionHeader
        title={
          currentModuleDetails
            ? getTextByLanguage(
                currentModuleDetails.moduleNameEnglish,
                currentModuleDetails.moduleNameNepali
              )
            : t('masterSetup.dropdownConfig.title')
        }
      />
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
