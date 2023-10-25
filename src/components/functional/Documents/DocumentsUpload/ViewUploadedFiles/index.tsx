import { DataTable } from '@/components/functional/Table'
import { Text } from '@/components/ui/core/Text'
import { IDocument, IDocumentResponse } from '@/shared/shared.interface'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UploadedFiles from '../UploadedFiles/UploadedFiles'
import ViewUploadedFilesModal from '../UploadedFiles/ViewUploadedFilesModal'
import { getTextByLanguage } from '@/lib/i18n/i18n'

interface IViewUploadedFilesProps {
  loading?: boolean
  documentList: IDocumentResponse[]
}

const ViewUploadedFiles = (props: IViewUploadedFilesProps) => {
  const { loading, documentList } = props
  const { t } = useTranslation()

  const [currentViewDocument, setCurrentViewDocument] =
    useState<IDocumentResponse>()

  const handleToggleFileView = (document?: IDocumentResponse) => {
    setCurrentViewDocument(document)
  }

  const columns = useMemo<ColumnDef<IDocumentResponse>[]>(
    () => [
      {
        header: t('document.documentTypeEn'),
        accessorKey: 'documentTypeEn',
      },
      {
        header: t('document.documentTypeNp'),
        accessorKey: 'documentTypeNp',
      },
      {
        header: t('document.isMandatory'),
        accessorKey: 'isMandatory',
        cell: ({ row: { original } }) =>
          original.isMandatory ? t('yes') : t('no'),
      },
      {
        header: t('document.allowedFileTypes'),
        accessorKey: 'allowedFileTypes',
      },
      {
        header: t('document.maxFileSize'),
        accessorKey: 'maxFileSize',
      },
      {
        header: t('document.uploadedFiles'),
        cell: ({ row: { original } }) => {
          return (
            <UploadedFiles
              filesData={original?.documents || []}
              toggleFileView={() => {
                handleToggleFileView(original)
              }}
            />
          )
        },
      },
    ],
    [t]
  )

  return (
    <div className="">
      <div className="mt-4">
        <Text variant="h5" typeface="semibold">
          {t('document.title')}
        </Text>
      </div>

      <DataTable
        data={documentList}
        columns={columns}
        isLoading={loading}
        withScrollable={false}
      />

      <ViewUploadedFilesModal
        isOpen={!!currentViewDocument}
        filesData={currentViewDocument?.documents || []}
        toggleFileViewModal={handleToggleFileView}
        modalTitle={
          currentViewDocument
            ? getTextByLanguage(
                currentViewDocument?.documentTypeEn,
                currentViewDocument?.documentTypeNp
              )
            : ''
        }
      />
    </div>
  )
}

export default ViewUploadedFiles
