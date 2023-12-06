import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '@/components/ui/Modal/Modal'
import {
  useDeleteRecommendationById,
  useGetAllRecommendation,
  useChangeRecommendationStatus,
} from './AddRecommendation/services/add-recommendation.query'
import { IRecommendationResponse } from './AddRecommendation/schema/add-recommendation.interface'
import AddRecommendationForm from './AddRecommendation'
import Switch from '@/components/functional/Form/Switch/Switch'

const RegistrationBookTable = () => {
  const { t } = useTranslation()
  const {
    data: allRecommendationList = [],
    isFetching: allRecommendationFetching,
  } = useGetAllRecommendation()

  const {
    mutate: changeRecommendationStatus,
    isLoading: changeRecommendationStatusLoading,
  } = useChangeRecommendationStatus()

  const [currentSelectedId, setCurrentSelectedId] = useState<string | number>(
    ''
  )
  const setOrRemoveCurrentSelectedId = (id?: string | number) =>
    setCurrentSelectedId(id || '')

  const [currentSelectedIdToChangeStatus, setCurrentSelectedIdToChangeStatus] =
    useState<string | number>('')
  const setOrRemoveCurrentSelectedIdToChangeStatus = (id?: string | number) =>
    setCurrentSelectedIdToChangeStatus(id || '')

  const [editId, setEditId] = useState<number>()
  const [openRecommendationForm, setOpenRecommendationForm] =
    useState<boolean>(false)
  const toggleRecommendationForm = () =>
    setOpenRecommendationForm(!openRecommendationForm)

  const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteRecommendationById()

  const handleDeleteById = () => {
    deleteById(currentSelectedId, {
      onSuccess: () => {
        setOrRemoveCurrentSelectedId()
      },
    })
  }

  const handleChangeStatus = () => {
    if (currentSelectedIdToChangeStatus) {
      changeRecommendationStatus(
        { recommendationId: currentSelectedIdToChangeStatus },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedIdToChangeStatus()
          },
        }
      )
    }
  }

  const columns = useMemo<ColumnDef<IRecommendationResponse>[]>(
    () => [
      {
        accessorKey: 'id',
        header: t('recommendation.recommendationNo'),
      },
      {
        accessorKey: 'recommendationNameEn',
        header: t('recommendation.recommendationNameEn'),
      },
      {
        accessorKey: 'recommendationNameNp',
        header: t('recommendation.recommendationNameNp'),
      },
      {
        header: t('masterSetup.office.status'),
        accessorKey: 'isActive',
        cell: ({
          row: {
            original: { id, isActive },
          },
        }) => (
          <Switch
            checked={isActive}
            onChange={() => {
              setOrRemoveCurrentSelectedIdToChangeStatus(id)
            }}
          />
        ),
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
              setEditId(id)
              toggleRecommendationForm()
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
      <SectionHeader title={t('recommendation.title')} />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN={false}
            isLoading={allRecommendationFetching}
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                toggleRecommendationForm()
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
        title={t('recommendation.deleteModal.title')}
        saveBtnProps={{
          btnAction: handleDeleteById,
          loading: deleteByIdLoading,
          btnTitle: t('btns.delete'),
        }}
        cancelBtnProps={{
          btnAction: () => {
            setOrRemoveCurrentSelectedId()
          },
        }}
      >
        {t('recommendation.deleteModal.description')}
      </Modal>

      <Modal
        open={!!currentSelectedIdToChangeStatus}
        toggleModal={setOrRemoveCurrentSelectedIdToChangeStatus}
        size="md"
        title={t('recommendation.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeRecommendationStatusLoading,
          btnTitle: t('btns.update'),
        }}
      >
        {t('recommendation.modal.status.description')}
      </Modal>

      <AddRecommendationForm
        toggleRecommendationForm={toggleRecommendationForm}
        openRecommendationForm={openRecommendationForm}
        editId={editId}
      />
    </>
  )
}

export default RegistrationBookTable
