import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetAllFieldByRecommendationId } from './services/fields.query'
import { IAddFieldResponse } from './schema/field.interface'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { boolean } from 'yup'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import { decodeParams, encodeParams } from '@/utility/route-params'
import AddField from './AddField'
import { useGetRecommendationDetailById } from '../AddRecommendation/services/add-recommendation.query'

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

  const navigateToRecommendationList = () => {
    navigate(privateRoutePath.recommendation.base)
  }

  const recommendationId = decodeParams<string>(params?.id)

  const { data: recommendationDetails } = useGetRecommendationDetailById(
    recommendationId ?? ''
  )

  const {
    data: allFiledByRecommendationIdList = [],
    isFetching: allFiledByRecommendationFetching,
  } = useGetAllFieldByRecommendationId(recommendationId)

  const [currentSelectedId, setCurrentSelectedId] = useState<string | number>(
    ''
  )

  const columns = useMemo<ColumnDef<IAddFieldResponse>[]>(
    () => [
      {
        accessorKey: 'nameEnglish',
        header: t('recommendation.fieldName'),
      },
      {
        accessorKey: 'nameNepali',
        header: t('recommendation.fieldType'),
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
              toggleRecommendationForm()
            }}
            handleViewClick={() => {
              toggleRecommendationForm()
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
        formId={recommendationId!}
      />
    </>
  )
}

export default RegistrationBookTable
