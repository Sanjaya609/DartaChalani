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
  // useChangeRecommendationStatus,
} from './AddRecommendation/services/add-recommendation.query'
import { IRecommendationResponse } from './AddRecommendation/schema/add-recommendation.interface'
import AddRecommendationForm from './AddRecommendation'
import Switch from '@/components/functional/Form/Switch/Switch'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { boolean } from 'yup'
import { privateRoutePath, useNavigate } from '@/router'
import { encodeParams } from '@/utility/route-params'

const RegistrationBookTable = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    data: allRecommendationList = [],
    isFetching: allRecommendationFetching,
  } = useGetAllRecommendation()

  // const {
  //   mutate: changeRecommendationStatus,
  //   isLoading: changeRecommendationStatusLoading,
  // } = useChangeRecommendationStatus()

  const [currentSelectedId, setCurrentSelectedId] = useState<string | number>(
    ''
  )
  const setOrRemoveCurrentSelectedId = (id?: string | number) =>
    setCurrentSelectedId(id || '')

  // const [currentSelectedIdToChangeStatus, setCurrentSelectedIdToChangeStatus] =
  //   useState<string | number>('')
  // const setOrRemoveCurrentSelectedIdToChangeStatus = (id?: string | number) =>
  //   setCurrentSelectedIdToChangeStatus(id || '')

  const [editId, setEditId] = useState<number>()
  const [viewOnly, setViewOnly] = useState(false)
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

  const columns = useMemo<ColumnDef<IRecommendationResponse>[]>(
    () => [
      {
        accessorKey: 'nameEnglish',
        header: t('recommendation.recommendationNameEn'),
      },
      {
        accessorKey: 'nameNepali',
        header: t('recommendation.recommendationNameNp'),
      },
      {
        accessorKey: 'moduleNameEnglish',
        header: t('security.module.moduleNameEnglish'),
      },
      {
        accessorKey: 'moduleNameNepali',
        header: t('security.module.moduleNameNepali'),
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
            handleViewClick={() => {
              setEditId(id)
              toggleRecommendationForm()
              setViewOnly(true)
            }}
            handleDeleteClick={() => {
              setCurrentSelectedId(id)
            }}
            handleConfigureClick={() => {
              navigate(privateRoutePath.recommendation.configure, {
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
      <SectionHeader
        title={
          currentModuleDetails
            ? getTextByLanguage(
                currentModuleDetails.moduleNameEnglish,
                currentModuleDetails.moduleNameNepali
              )
            : t('masterSetup.fiscalYear.title')
        }
      />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN={true}
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

      <AddRecommendationForm
        toggleRecommendationForm={() => {
          toggleRecommendationForm()
          setEditId(undefined)
        }}
        openRecommendationForm={openRecommendationForm}
        editId={editId}
        viewOnly={viewOnly}
        setViewOnly={setViewOnly}
      />
    </>
  )
}

export default RegistrationBookTable
