import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate } from '@/router'
import { encodeParams } from '@/utility/route-params'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IRegistrationBookResponse } from '../AddRegistrationBook/schema/add-registration-book.interface'
import {
  useDeleteRegistrationBookById,
  useGetAllRegistrationBook,
} from '../AddRegistrationBook/services/add-registration-book.query'
import Modal from '@/components/ui/Modal/Modal'
import { IRoutePrivilege } from '@/router/routes/create-route'

const RegistrationBookTable = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    data: allRegistrationBookList = [],
    isFetching: allRegistrationBookFetching,
  } = useGetAllRegistrationBook()

  const [currentSelectedId, setCurrentSelectedId] = useState<string | number>(
    ''
  )

  const setOrRemoveCurrentSelectedId = (id?: string | number) =>
    setCurrentSelectedId(id || '')

  const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteRegistrationBookById()

  const handleDeleteById = () => {
    deleteById(currentSelectedId, {
      onSuccess: () => {
        setOrRemoveCurrentSelectedId()
      },
    })
  }

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
        sticky: 'right',
        id: 'action',
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
            handleDeleteClick={() => {
              setCurrentSelectedId(id)
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
            : t('registrationBook.title')
        }
      />

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

      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('registrationBook.deleteModal.title')}
        saveBtnProps={{
          btnAction: handleDeleteById,
          loading: deleteByIdLoading,
          btnTitle: t('btns.delete'),
        }}
      >
        {t('registrationBook.deleteModal.description')}
      </Modal>
    </>
  )
}

export default RegistrationBookTable
