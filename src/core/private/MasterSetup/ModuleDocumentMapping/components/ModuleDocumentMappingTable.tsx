import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IModuleDocumentMappingInitialValue,
  IModuleDocumentMappingResponse,
} from '../schema/module-document-mapping.interface'
import {
  useChangeModuleDocumentMappingStatus,
  useGetAllModuleDocumentMapping,
} from '../services/module-document-mapping.query'

interface IModuleDocumentMappingTableProps {
  initialValues: IModuleDocumentMappingInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IModuleDocumentMappingInitialValue>
  >
}

const ModuleDocumentMappingTable = (
  props: IModuleDocumentMappingTableProps
) => {
  const { setInitialValues } = props

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const { t } = useTranslation()
  const { data: documentTypeData, isFetching } =
    useGetAllModuleDocumentMapping()
  const {
    mutate: changeDocumentTypeStatus,
    isLoading: changeDocumentTypeStatusLoading,
  } = useChangeModuleDocumentMappingStatus()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const handleEditClick = ({
    id,
    isMandatory,
    moduleResponse: { id: moduleId },
    documentTypeResponse: { id: documentTypeId },
  }: IModuleDocumentMappingResponse) => {
    setInitialValues({
      id,
      isMandatory,
      moduleId,
      documentTypeId,
    })
  }

  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeDocumentTypeStatus(
        { documentTypeId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  const columns = React.useMemo<ColumnDef<IModuleDocumentMappingResponse>[]>(
    () => [
      {
        header: t('masterSetup.documentType.documentTypeEn'),
        accessorKey: 'documentTypeResponse.documentTypeEn',
      },
      {
        header: t('masterSetup.documentType.documentTypeNp'),
        accessorKey: 'documentTypeResponse.documentTypeNp',
      },
      {
        header: t('security.module.moduleNameEnglish'),
        accessorKey: 'moduleResponse.moduleNameEnglish',
      },
      {
        header: t('security.module.moduleNameNepali'),
        accessorKey: 'moduleResponse.moduleNameNepali',
      },
      {
        header: t('masterSetup.documentType.isMandatory'),
        accessorKey: 'isMandatory',
        cell: ({ row: { original } }) =>
          original.isMandatory ? t('yes') : t('no'),
      },

      // {
      //   header: t('masterSetup.documentType.status'),
      //   accessorKey: 'isActive',
      //   cell: ({ row: { original } }) => (
      //     <Switch
      //       checked={original.isActive}
      //       onChange={() => {
      //         setOrRemoveCurrentSelectedId(original.id)
      //       }}
      //     />
      //   ),
      // },
      {
        header: t('actions'),
        cell: ({ row: { original } }) => (
          <TableAction
            handleEditClick={() => {
              handleEditClick(original)
            }}
          />
        ),
      },
    ],
    [t]
  )

  return (
    <>
      <DataTable
        isLoading={isFetching}
        columns={columns}
        data={documentTypeData || []}
      />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('masterSetup.sector.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeDocumentTypeStatusLoading,
        }}
      >
        {t('masterSetup.sector.modal.status.description')}
      </Modal>
    </>
  )
}

export default ModuleDocumentMappingTable
