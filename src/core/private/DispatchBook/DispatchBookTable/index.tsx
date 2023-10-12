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
import { IRegistrationBookResponse } from '../AddRegistrationBook/schema/add-registration-book.interface'
import { useGetAllRegistrationBook } from '../AddRegistrationBook/services/add-registration-book.query'

const RegistrationBookTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    data: allRegistrationBookList = [],
    isFetching: allRegistrationBookFetching,
  } = useGetAllRegistrationBook()

  const columns = useMemo<ColumnDef<IRegistrationBookResponse>[]>(
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
              navigate(privateRoutePath.registrationBook.view, {
                params: { id: encodeParams(id) },
              })
            }}
            handleEditClick={() => {
              navigate(privateRoutePath.registrationBook.edit, {
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
      <SectionHeader title={t('registrationBook.title')} />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN={false}
            isLoading={allRegistrationBookFetching}
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(privateRoutePath.registrationBook.add)
              },
            }}
            className="pb-4"
            columns={columns}
            data={allRegistrationBookList}
          />
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

export default RegistrationBookTable
