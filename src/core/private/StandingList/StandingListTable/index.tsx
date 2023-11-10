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
import { IStandingListResponse } from '../AddStandingList/schema/standing-list.interface'
import {
  useDeleteStandingListById,
  useGetAllStandingList,
} from '../AddStandingList/services/standing-list.query'
import Modal from '@/components/ui/Modal/Modal'

const StandingListTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: allStandingList = [], isFetching: allStandingListFetching } =
    useGetAllStandingList()

  const [currentSelectedId, setCurrentSelectedId] = useState<string | number>(
    ''
  )

  const setOrRemoveCurrentSelectedId = (id?: string | number) =>
    setCurrentSelectedId(id || '')

  const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteStandingListById()

  const handleDeleteById = () => {
    deleteById(currentSelectedId, {
      onSuccess: () => {
        setOrRemoveCurrentSelectedId()
      },
    })
  }

  const columns = useMemo<ColumnDef<IStandingListResponse>[]>(
    () => [
      {
        accessorKey: 'letter_no',
        header: t('standingList.letter_no'),
      },
      {
        accessorKey: 'applicationDate',
        header: t('standingList.applicationDate'),
      },
      {
        accessorKey: 'personOrFirmName',
        header: t('standingList.personOrFirmName'),
      },
      {
        accessorKey: 'registrationDate',
        header: t('standingList.registrationDate'),
      },
      {
        accessorKey: getTextByLanguage(
          'serviceTypeNameNp',
          'serviceTypeNameEn'
        ),
        header: t('standingList.serviceTypeId'),
      },
      {
        accessorKey: 'firmRegistrationNumber',
        header: t('standingList.firmRegistrationNumber'),
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

      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('standingList.deleteModal.title')}
        saveBtnProps={{
          btnAction: handleDeleteById,
          loading: deleteByIdLoading,
          btnTitle: t('btns.delete'),
        }}
      >
        {t('standingList.deleteModal.description')}
      </Modal>
    </>
  )
}

export default StandingListTable
