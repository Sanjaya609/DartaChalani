import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetRecommendationDetailById } from '../AddRecommendation/services/add-recommendation.query'
import {
  useGetAllFieldByRecommendationId,
  useGetFieldDetailById,
  useDeleteFieldById,
} from './services/fields.query'
import { IAddFieldResponse } from './schema/field.interface'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import { decodeParams } from '@/utility/route-params'
import AddField from './AddField'
import Modal from '@/components/ui/Modal/Modal'

const RegistrationBookTable = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const [editId, setEditId] = useState<number>()
  const [viewOnly, setViewOnly] = useState(false)
  const [openRecommendationForm, setOpenRecommendationForm] =
    useState<boolean>(false)
  const toggleRecommendationForm = () =>
    setOpenRecommendationForm(!openRecommendationForm)

  const [currentSelectedId, setCurrentSelectedId] = useState<string | number>(
    ''
  )
  const setOrRemoveCurrentSelectedId = (id?: string | number) =>
    setCurrentSelectedId(id || '')

  const navigateToRecommendationList = () => {
    navigate(privateRoutePath.recommendation.base)
  }

  const recommendationId = decodeParams<string>(params?.id)
  const { data: recommendationDetails } = useGetRecommendationDetailById(
    recommendationId ?? ''
  )
  const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteFieldById()

  const {
    data: allFiledByRecommendationIdList = [],
    isFetching: allFiledByRecommendationFetching,
  } = useGetAllFieldByRecommendationId(recommendationId)

  const handleDeleteById = () => {
    deleteById(currentSelectedId, {
      onSuccess: () => {
        setOrRemoveCurrentSelectedId()
      },
    })
  }

  const columns = useMemo<ColumnDef<IAddFieldResponse>[]>(
    () => [
      {
        accessorKey: getTextByLanguage('labelNameEnglish', 'labelNameNepali'),
        header: t('recommendation.fieldName'),
      },
      {
        accessorKey: 'fieldType',
        header: t('recommendation.fieldType'),
      },
      {
        accessorKey: 'orderNo',
        header: t('recommendation.orderNo'),
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
              setViewOnly
            }}
            handleDeleteClick={() => {
              setCurrentSelectedId(id)
            }}
            // handleConfigureClick={() => {
            //   navigate(privateRoutePath.recommendation.configure, {
            //     params: { id: encodeParams(id) },
            //   })
            // }}
          />
        ),
      },
    ],
    [t]
  )
  return (
    <>
      <SectionHeader
        title={recommendationDetails?.nameEnglish}
        backAction={navigateToRecommendationList}
      />

      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN={false}
            isLoading={allFiledByRecommendationFetching}
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                toggleRecommendationForm()
              },
              label: t('recommendation.addField'),
            }}
            className="pb-4"
            columns={columns}
            data={allFiledByRecommendationIdList}
          />
        </FlexLayout>
      </ContainerLayout>

      <AddField
        toggleRecommendationForm={() => {
          toggleRecommendationForm()
          setEditId(undefined)
        }}
        openRecommendationForm={openRecommendationForm}
        editId={editId}
        viewOnly={viewOnly}
        setViewOnly={setViewOnly}
        formId={parseInt(recommendationId!)}
      />

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
    </>
  )
}

export default RegistrationBookTable
