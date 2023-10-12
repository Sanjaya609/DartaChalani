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
import { IDispatchBookResponse } from '../AddDispatchBook/schema/add-dispatch-book.interface'
import { useGetAllDispatchBook } from '../AddDispatchBook/services/add-dispatch-book.query'

const DispatchBookTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    data: allRegistrationBookList = [],
    isFetching: allRegistrationBookFetching,
  } = useGetAllDispatchBook()

  const columns = useMemo<ColumnDef<IDispatchBookResponse>[]>(
    () => [
      {
        accessorKey: 'dispatchDate',
        header: t('dispatchBook.dispatchDate'),
      },
      {
        accessorKey: 'dispatchNumber',
        header: t('dispatchBook.dispatchNumber'),
      },
      {
        accessorKey: 'letterDate',
        header: t('dispatchBook.letterDate'),
      },
      {
        accessorKey: 'letterReceiverName',
        header: t('dispatchBook.letterReceiverName'),
      },
      {
        accessorKey: 'letterReceiverEmail',
        header: t('dispatchBook.letterReceiverEmail'),
      },
      {
        accessorKey: 'letterReceiverAddress',
        header: t('dispatchBook.letterReceiverAddress'),
      },
      {
        accessorKey: 'letterCarrierName',
        header: t('dispatchBook.letterCarrierName'),
      },
      {
        accessorKey: 'letterCarrierContact',
        header: t('dispatchBook.letterCarrierContact'),
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
              navigate(privateRoutePath.dispatchBook.view, {
                params: { id: encodeParams(id) },
              })
            }}
            handleEditClick={() => {
              navigate(privateRoutePath.dispatchBook.edit, {
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
      <SectionHeader title={t('dispatchBook.title')} />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN={false}
            isLoading={allRegistrationBookFetching}
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(privateRoutePath.dispatchBook.add)
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

export default DispatchBookTable
