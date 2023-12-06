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
import Modal from '@/components/ui/Modal/Modal'
import {
  useDeleteRegistrationBookById,
  useGetAllRecommendation,
} from './AddRecommendation/services/add-recommendation.query'
import { IRecommendationResponse } from './AddRecommendation/schema/add-recommendation.interface'

const RegistrationBookTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    data: allRecommendationList = [],
    isFetching: allRecommendationFetching,
  } = useGetAllRecommendation()

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

  const columns = useMemo<ColumnDef<IRecommendationResponse>[]>(
    () => [
      {
        accessorKey: 'id',
        header: t('registrationBook.registrationNumber'),
      },
      {
        accessorKey: 'recommendationNameEn',
        header: 'Recommendation Name (EN)',
      },
      {
        accessorKey: 'recommendationNameNp',
        header: 'Recommendation Name (NP)',
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active?',
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
      <SectionHeader title="Recommendation " />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN={false}
            isLoading={allRecommendationFetching}
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(privateRoutePath.recommendation.add)
              },
            }}
            className="pb-4"
            columns={columns}
            data={allRecommendationList}
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
