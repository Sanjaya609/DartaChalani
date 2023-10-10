import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate } from '@/router'
import { encodeParams } from '@/utility/route-params'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IStandingListResponse } from '../AddStandingList/schema/standing-list.interface'
import { useGetAllStandingList } from '../AddStandingList/services/standing-list.query'

const StandingListTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: allStandingList = [], isFetching: allStandingListFetching } =
    useGetAllStandingList()

  const columns = useMemo<ColumnDef<IStandingListResponse>[]>(
    () => [
      {
        accessorKey: 'registrationNumber',
        header: t('registrationBook.registrationNumber'),
      },
      {
        accessorKey: 'applicationDate',
        header: t('registrationBook.applicationDate'),
      },
      {
        accessorKey: 'letterDispatchDate',
        header: t('registrationBook.letterDispatchDate'),
      },
      {
        accessorKey: 'letterDispatchNumber',
        header: t('registrationBook.letterDispatchNumber'),
      },
      {
        accessorKey: getTextByLanguage('sectorNameEnglish', 'sectorNameNepali'),
        header: t('registrationBook.sectorId'),
      },
      {
        accessorKey: 'letterSenderName',
        header: t('registrationBook.letterSenderName'),
      },
      {
        accessorKey: 'letterToPerson',
        header: t('registrationBook.letterToPerson'),
      },
      {
        header: t('actions'),
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <TableAction
            handleViewClick={() => {
              navigate(privateRoutePath.standingList.view, {
                params: { id: encodeParams(id) },
              })
            }}
            handleEditClick={() => {
              navigate(privateRoutePath.standingList.edit, {
                params: { id: encodeParams(id) },
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
      <SectionHeader title={t('standingList.title')} />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN={false}
            isLoading={allStandingListFetching}
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(privateRoutePath.standingList.add)
              },
            }}
            className="pb-4"
            columns={columns}
            data={allStandingList}
          />
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

export default StandingListTable
