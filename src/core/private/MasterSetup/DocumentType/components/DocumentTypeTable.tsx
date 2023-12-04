import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IDocumentTypeInitialValue,
  IDocumentTypeResponse,
} from '../schema/document-type.interface'
import {
  useChangeDocumentTypeStatus,
  useGetAllDocumentType,
} from '../services/document-type.query'

interface IDocumentTypeProps {
  initialValues: IDocumentTypeInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IDocumentTypeInitialValue>
  >
}

const DocumentType = (props: IDocumentTypeProps) => {
  const { setInitialValues } = props

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const { t } = useTranslation()
  const { data: documentTypeData, isFetching } = useGetAllDocumentType()
  const {
    mutate: changeDocumentTypeStatus,
    isLoading: changeDocumentTypeStatusLoading,
  } = useChangeDocumentTypeStatus()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const handleEditClick = ({
    id,
    allowedFileTypes,
    documentTypeEn,
    documentTypeNp,
    maxFileSize,
  }: IDocumentTypeResponse) => {
    setInitialValues({
      id,
      allowedFileTypes,
      documentTypeEn,
      documentTypeNp,
      maxFileSize,
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

  const columns = React.useMemo<ColumnDef<IDocumentTypeResponse>[]>(
    () => [
      {
        header: t('masterSetup.documentType.documentTypeEn'),
        accessorKey: 'documentTypeEn',
      },
      {
        header: t('masterSetup.documentType.documentTypeNp'),
        accessorKey: 'documentTypeNp',
      },
      {
        header: t('masterSetup.documentType.maxFileSize'),
        accessorKey: 'maxFileSize',
      },
      {
        header: t('masterSetup.documentType.allowedFileTypes'),
        accessorKey: 'allowedFileTypes',
      },
      {
        header: t('masterSetup.documentType.status'),
        accessorKey: 'isActive',
        cell: ({ row: { original } }) => (
          <Switch
            checked={original.isActive}
            onChange={() => {
              setOrRemoveCurrentSelectedId(original.id)
            }}
          />
        ),
      },
      {
        header: t('actions'),
        sticky: 'right',
        id: 'action',
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
        canSearch
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

export default DocumentType
