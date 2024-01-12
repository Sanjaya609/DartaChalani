import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { IDropdownConfigResponse } from '@/core/private/MasterSetup/DropdownConfig/AddDropDownConfig/schema/dropdown-config.interface'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const DynamicFormModuleTable = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const columns = React.useMemo<ColumnDef<IDropdownConfigResponse>[]>(
    () => [
      {
        header: 'Dynamic Fields',
        accessorKey: 'dropDownCode',
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
                navigate(`${currentModuleDetails?.url}/add`)
              },
            }}
            columns={columns}
            data={[]}
          />
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

export default DynamicFormModuleTable
