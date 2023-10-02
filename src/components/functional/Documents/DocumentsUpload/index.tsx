import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  FileData,
  FileStateFile,
  IDocumentPayload,
  IFileState,
} from './document-upload.interface'
import { DataTable } from '../../Table'
import TableAction from '../../Table/Components/Table/TableAction'
import {
  tableActionIcon,
  tableActionList,
  tableActionTooltip,
} from '../../Table/Components/Table/table.schema'
import { Gear, UploadSimple } from 'phosphor-react'
import { Box } from '@/components/ui'
import { ColumnDef } from '@tanstack/react-table'
import { useGetAllDocumentListByModuleId } from '@/core/private/MasterSetup/DocumentType/services/document-type.query'
import { useDocumentUpload } from '@/service/generic/generic.query'
import { validateDocumentFile } from '@/utility/document/document-validations'
import { IDocumentTypeResponse } from '@/core/private/MasterSetup/DocumentType/schema/document-type.interface'
import toast, {
  ToastType,
} from '@/components/functional/ToastNotifier/ToastNotifier'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { useTranslation } from 'react-i18next'
import UploadedFiles from './UploadedFiles/UploadedFiles'
import ViewUploadedFilesModal from './UploadedFiles/ViewUploadedFilesModal'

interface IDocumentsUploadProps {
  moduleId?: StringNumber
  canUploadMultipleFile?: boolean
  setIsAllRequiredDocumentUploaded: Dispatch<SetStateAction<boolean>>
  setUploadedDocumentData?: Dispatch<SetStateAction<IDocumentPayload[]>>
}

const flatDocDataForPayload = (files: FileStateFile) => {
  return Object.values(files)
    .map(({ filesData, documentTypeId }) =>
      filesData.map((doc) => ({
        guid: doc.guid || '',
        documentTypeId: +documentTypeId,
      }))
    )
    .flat(1)
}

const DocumentsUpload = (props: IDocumentsUploadProps) => {
  const {
    moduleId,
    canUploadMultipleFile = false,
    setIsAllRequiredDocumentUploaded,
    setUploadedDocumentData,
  } = props
  const [fileState, setFileState] = useState<IFileState>({
    files: {},
    isRequiredFileUploaded: false,
  })

  const [currentViewDocument, setCurrentViewDocument] = useState<StringNumber>()

  const { t } = useTranslation()

  const { data: requiredDocumentList = [] } =
    useGetAllDocumentListByModuleId('56')

  const { mutate: uploadDocument } = useDocumentUpload()

  const structureFileState = () => {
    const initialFileState = requiredDocumentList.reduce<FileStateFile>(
      (allFiles, currFile) => {
        allFiles[currFile.id] = {
          documentTypeId: currFile.id,
          fileData: {
            guid: '',
            file: null,
          },
          allowedFileTypes: currFile.allowedFileTypes,
          errors: [],
          isMandatory: currFile.isMandatory,
          documentTypeEn: currFile.documentTypeEn,
          documentTypeNp: currFile.documentTypeNp,
          maxFileSize: currFile.maxFileSize,
          filesData: [],
        }
        return allFiles
      },
      {}
    )

    const isRequiredFileUploaded = requiredDocumentList.some(
      (file) => file.isMandatory
    )

    setFileState({
      files: initialFileState,
      isRequiredFileUploaded,
    })
    setIsAllRequiredDocumentUploaded(!isRequiredFileUploaded)
  }

  useEffect(() => {
    if (requiredDocumentList) {
      structureFileState()
    }
  }, [requiredDocumentList])

  const validateFileChanges = (files: FileStateFile) => {
    const mandatoryFiles = Object.values(files).filter(
      (fileItem) => fileItem.isMandatory
    )

    let isRequiredFileUploaded = false
    if (canUploadMultipleFile) {
      isRequiredFileUploaded = mandatoryFiles
        .map((doc) => doc)
        .every((doc) => !!doc.filesData?.length)
    } else {
      isRequiredFileUploaded = mandatoryFiles.every(
        (file) => !!file.fileData?.file
      )
    }

    setFileState((prevState) => ({
      ...prevState,
      isRequiredFileUploaded,
    }))

    if (setUploadedDocumentData) {
      const allDocumentData = canUploadMultipleFile
        ? flatDocDataForPayload(files)
        : [
            ...Object.values(files).map((doc) => ({
              guid: doc?.fileData?.guid || '',
              documentTypeId: +doc.documentTypeId,
            })),
          ]

      if (canUploadMultipleFile) {
        setUploadedDocumentData(allDocumentData)
      }

      setIsAllRequiredDocumentUploaded(isRequiredFileUploaded)
    }
  }

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const {
        target: { files, id },
      } = event

      const validateFileMsg = validateDocumentFile({
        file: files[0],
        allowedFileTypes: fileState.files[id].allowedFileTypes,
        maxFileSize: fileState.files[id].maxFileSize,
      })

      if (validateFileMsg.length) {
        return toast({
          message: getTextByLanguage(validateFileMsg[0], validateFileMsg[1]),
          type: ToastType.error,
        })
      }

      uploadDocument(
        { file: files[0] },
        {
          onSuccess: (res) => {
            let updatedFileState = {} as IFileState
            if (!canUploadMultipleFile) {
              updatedFileState = {
                ...fileState,
                files: {
                  ...fileState.files,
                  [id]: {
                    ...fileState.files[id],
                    fileData: {
                      file: files[0],
                      guid: res?.data.data.uuid || '',
                    },
                  },
                },
              }
            } else {
              updatedFileState = {
                ...fileState,
                files: {
                  ...fileState.files,
                  [id]: {
                    ...fileState.files[id],
                    filesData: [
                      ...fileState.files[id].filesData,
                      { file: files[0], guid: res?.data.data.uuid || '' },
                    ],
                  },
                },
              }
            }

            setFileState(updatedFileState)
            validateFileChanges(updatedFileState.files)
          },
        }
      )
    }
  }

  const handleToggleFileView = (id?: StringNumber) => {
    setCurrentViewDocument(id)
  }

  const columns = useMemo<ColumnDef<IDocumentTypeResponse>[]>(
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
        cell: ({
          row: {
            original: { id },
          },
        }) => {
          return (
            <UploadedFiles
              filesData={
                !canUploadMultipleFile && fileState.files[id]?.fileData?.file
                  ? ([fileState.files[id].fileData] as FileData[])
                  : fileState.files[id]?.filesData || []
              }
              toggleFileView={() => {
                handleToggleFileView(id)
              }}
            />
          )
        },
      },
      {
        header: 'Actions',
        cell: ({ row: { original } }) => {
          const { id, allowedFileTypes } = original
          const acceptProps = allowedFileTypes
            .map((fileType) => `.${fileType.toLowerCase()}`)
            .join(', ')
          return (
            <TableAction
              otherActionsComp={
                <>
                  <li className={tableActionList}>
                    <span className="group relative ">
                      <label htmlFor={`${id}`} className="cursor-pointer">
                        <UploadSimple
                          className={tableActionIcon}
                          weight="fill"
                        />
                        <Box as="span" className={tableActionTooltip}>
                          {t('btns.upload')}
                        </Box>
                      </label>
                      <input
                        accept={acceptProps}
                        onChange={handleInputFileChange}
                        id={`${id}`}
                        type="file"
                        className="sr-only"
                      />
                    </span>
                  </li>
                </>
              }
            />
          )
        },
      },
    ],
    [fileState.files, t]
  )

  return (
    <div className="h-full">
      <DataTable data={requiredDocumentList} columns={columns} />

      <ViewUploadedFilesModal
        isOpen={!!currentViewDocument}
        filesData={
          !canUploadMultipleFile &&
          currentViewDocument &&
          fileState.files[currentViewDocument]?.fileData?.file
            ? ([fileState.files[currentViewDocument].fileData] as FileData[])
            : currentViewDocument
            ? fileState.files[currentViewDocument]?.filesData || []
            : []
        }
        toggleFileViewModal={handleToggleFileView}
        modalTitle={
          currentViewDocument
            ? getTextByLanguage(
                fileState.files[currentViewDocument]?.documentTypeEn,
                fileState.files[currentViewDocument]?.documentTypeNp
              )
            : ''
        }
      />
    </div>
  )
}

export default DocumentsUpload