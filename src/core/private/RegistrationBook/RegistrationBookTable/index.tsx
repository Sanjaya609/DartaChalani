import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { privateRoutePath, useNavigate } from '@/router'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const RegistrationBookTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<TAny>[]>(
    () => [
      {
        accessorKey: 'roleNameEnglish',
        header: t('security.roleSetup.roleNameEnglish'),
      },

      {
        accessorKey: 'roleNameNepali',
        header: t('security.roleSetup.roleNameNepali'),
      },
      {
        accessorKey: 'roleType',
        header: t('security.roleSetup.roleType'),
      },
    ],
    [t]
  )
  return (
    <>
      <SectionHeader title={t('registrationBook.title')} />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(privateRoutePath.registrationBook.add)
              },
            }}
            className="pb-4"
            columns={columns}
            data={[]}
          />
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

export default RegistrationBookTable
