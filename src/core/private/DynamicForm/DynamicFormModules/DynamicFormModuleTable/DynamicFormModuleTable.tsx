import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import {
  useDeleteFieldValueById,
  useGetDynamicFieldListByFormId,
} from '@/core/private/Recommendation/Fields/services/fields.query'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useNavigate } from '@/router'
import { encodeParams } from '@/utility/route-params'
import Modal from '@/components/ui/Modal/Modal'
import { usePagination } from '@/components/functional/Table/usePagination'

interface ConvertedDataItem {
  [key: string]: any
}
interface Field {
  labelNameEnglish: string
  fieldId: number
  value: any
}

const DynamicFormModuleTable = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const { limit, onPaginationChange, skip, pagination } = usePagination()
  const [deleteId, setdeleteId] = useState<string | number>('')
  const setOrRemovedeleteId = (id?: string | number) => setdeleteId(id || '')

  const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteFieldValueById()

  const handleDeleteById = () => {
    deleteById(deleteId, {
      onSuccess: () => {
        setOrRemovedeleteId()
      },
    })
  }

  const {
    mutateAsync: getDynamicFieldList,
    isLoading: dynamicFieldListDataFetching,
  } = useGetDynamicFieldListByFormId()

  const [dynamicFieldList, setDynamicFieldList] = useState<any[]>([])
  const initData = useCallback(async () => {
    const res: any = await getDynamicFieldList({
      id: currentModuleDetails?.id!,
      pqCurrentPage: pagination.pageIndex + 1,
      pqRpp: pagination.pageSize,
    })

    const dynamicFieldListData = Object.values(res?.data?.data)

    setDynamicFieldList(dynamicFieldListData)
  }, [currentModuleDetails?.id, pagination])

  useEffect(() => {
    initData()
  }, [initData, currentModuleDetails?.id])

  const columns = React.useMemo<ColumnDef<any>[]>(() => {
    if (dynamicFieldList.length) {
      return [
        ...dynamicFieldList[0]?.values?.map(
          (field: { labelNameEnglish: string; fieldId: number }) => ({
            id: field.fieldId,
            header: field.labelNameEnglish,
            accessorKey: (
              field.labelNameEnglish + field.fieldId
            ).toLocaleLowerCase(),
          })
        ),
        {
          header: t('actions'),
          sticky: 'right',
          id: 'action',
          cell: ({
            row: {
              original: { formValueId },
            },
          }) => (
            <TableAction
              handleViewClick={() => {
                navigate(
                  `${currentModuleDetails?.url}/view/${encodeParams(
                    formValueId
                  )}`,
                  {
                    state: { id: location?.state?.id! },
                  }
                )
              }}
              handleEditClick={() => {
                navigate(
                  `${currentModuleDetails?.url}/edit/${encodeParams(
                    formValueId
                  )}`,
                  {
                    state: { id: location?.state?.id! },
                  }
                )
              }}
              handleDeleteClick={() => {
                setdeleteId(formValueId)
              }}
            />
          ),
        },
      ]
    } else {
      return [
        {
          header: 'Dynamic Fields',
          accessorKey: '',
        },
      ]
    }
  }, [t, dynamicFieldListDataFetching, dynamicFieldList[0]?.values])

  const convertedData: ConvertedDataItem[] = dynamicFieldList?.map(
    (item: { values: Field[]; formValueId: number }) => {
      const convertedItem: ConvertedDataItem = {}
      item.values.forEach((field: Field) => {
        convertedItem[
          field?.labelNameEnglish?.toLocaleLowerCase() + field.fieldId
        ] = field?.value ?? '-'
      })

      convertedItem.formValueId = item.formValueId
      return convertedItem
    }
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
            : t('masterSetup.dropdownConfig.title')
        }
      />
      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            withSN
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(`${currentModuleDetails?.url}/add`, {
                  state: { id: location?.state?.id! },
                })
              },
            }}
            columns={columns}
            data={convertedData || []}
            isLoading={dynamicFieldListDataFetching}
            serverPagination
            serverPaginationParams={{
              pagination: pagination,
              setPagination: onPaginationChange,
              totalCount: dynamicFieldList.length
                ? dynamicFieldList[0].totalCount
                : 0,
            }}
          />
        </FlexLayout>
      </ContainerLayout>

      <Modal
        open={!!deleteId}
        toggleModal={setOrRemovedeleteId}
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

export default DynamicFormModuleTable
