import toast, {
  ToastType,
} from '@/components/functional/ToastNotifier/ToastNotifier'
import { Box } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { IModuleDocumentMappingResponse } from '@/core/private/MasterSetup/ModuleDocumentMapping/schema/module-document-mapping.interface'
import { useGetAllModuleDocumentMappingByModuleId } from '@/core/private/MasterSetup/ModuleDocumentMapping/services/module-document-mapping.query'
import { initApiRequest, RequestMethod } from '@/lib/api-request'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { useDocumentUpload } from '@/service/generic/generic.query'
import { IDocumentResponse } from '@/shared/shared.interface'
import { validateDocumentFile } from '@/utility/document/document-validations'
import { ColumnDef } from '@tanstack/react-table'
import { UploadSimple } from 'phosphor-react'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { DataTable } from '../../Table'
import {
  tableActionIcon,
  tableActionList,
  tableActionTooltip,
} from '../../Table/Components/Table/table.schema'
import TableAction from '../../Table/Components/Table/TableAction'
import DocumentsUploadProgress from '../DocumentUploadProgress'
import {
  FileData,
  FileStateFile,
  IDocumentPayload,
  IFileState,
} from './document-upload.interface'
import UploadedFiles from './UploadedFiles/UploadedFiles'
import ViewUploadedFilesModal from './UploadedFiles/ViewUploadedFilesModal'

interface IDocumentsUploadProps {
  moduleId: StringNumber
  canUploadMultipleFile?: boolean
  setIsAllRequiredDocumentUploaded?: Dispatch<SetStateAction<boolean>>
  setUploadedDocumentData?: Dispatch<SetStateAction<IDocumentPayload[]>>
  viewOnly?: boolean
  documentList?: IDocumentResponse[]
  viewControllerName?: string
  deleteAPIDetails?: {
    controllerName: string
    queryKeyName: string
    requestMethod: RequestMethod
  }
  className?: string
  title?: string
}

const flatDocDataForPayload = (files: FileStateFile) => {
  return Object.values(files)
    .map(({ filesData, documentTypeId }) =>
      filesData.map((doc) => ({
        uuid: doc.uuid || '',
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
    viewOnly = false,
    documentList,
    viewControllerName = '',
    deleteAPIDetails,
    className = '',
    title,
  } = props
  const [fileState, setFileState] = useState<IFileState>({
    files: {},
    isRequiredFileUploaded: false,
  })

  const [isUpdateStatePrepared, setIsUpdateStatePrepared] = useState(false)

  const [currentViewDocument, setCurrentViewDocument] = useState<StringNumber>()
  const [uploadProgressValue, setUploadProgressValue] = useState(0)

  const { t } = useTranslation()

  const { data: requiredDocumentList = [], isLoading: documentLoading } =
    useGetAllModuleDocumentMappingByModuleId(moduleId)

  const { mutateAsync: uploadDocument, isLoading: isUploading } =
    useDocumentUpload(setUploadProgressValue)

  const structureFileState = () => {
    const initialFileState = requiredDocumentList.reduce<FileStateFile>(
      (allFiles, currFile) => {
        allFiles[currFile.documentTypeResponse.id] = {
          documentTypeId: currFile.documentTypeResponse.id,
          fileData: {
            uuid: '',
            file: null,
          },
          allowedFileTypes: currFile.documentTypeResponse.allowedFileTypes,
          errors: [],
          isMandatory: currFile.isMandatory,
          documentTypeEn: currFile.documentTypeResponse.documentTypeEn,
          documentTypeNp: currFile.documentTypeResponse.documentTypeNp,
          maxFileSize: currFile.documentTypeResponse.maxFileSize,
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
    setIsAllRequiredDocumentUploaded?.(!isRequiredFileUploaded)
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
              uuid: doc?.fileData?.uuid || '',
              documentTypeId: +doc.documentTypeId,
            })),
          ]

      setUploadedDocumentData(allDocumentData)

      setIsAllRequiredDocumentUploaded?.(isRequiredFileUploaded)
    }
  }

  useEffect(() => {
    if (
      Object.keys(fileState?.files)?.length &&
      documentList?.length &&
      !isUpdateStatePrepared
    ) {
      const newFileStates = { ...fileState.files }
      for (let documentTypeId in newFileStates) {
        newFileStates[documentTypeId] = {
          ...newFileStates[documentTypeId],
          ...(canUploadMultipleFile && {
            filesData:
              documentList
                ?.find((document) => document.id === +documentTypeId)
                ?.documents?.map((doc) => ({
                  fileUrl: doc.url,
                  uuid: doc.uuid,
                  file: null,
                  documentName: doc?.documentName,
                })) || [],
          }),
          ...(!canUploadMultipleFile && {
            fileData: documentList
              ?.find((document) => document.id === +documentTypeId)
              ?.documents?.map((doc) => ({
                fileUrl: doc.url,
                uuid: doc.uuid,
                file: null,
                documentName: doc?.documentName,
              }))[0] || {
              file: null,
              uuid: '',
            },
          }),
        }
      }
      setFileState((prevState) => ({
        ...prevState,
        files: newFileStates,
      }))

      setIsUpdateStatePrepared(true)
      validateFileChanges(newFileStates)
    }
  }, [documentList, fileState?.files, isUpdateStatePrepared])

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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

      await uploadDocument(
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
                      uuid: res?.data.data.uuid || '',
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
                      { file: files[0], uuid: res?.data.data.uuid || '' },
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
      setUploadProgressValue(0)
    }
  }

  const handleToggleFileView = (id?: StringNumber) => {
    setCurrentViewDocument(id)
  }

  const columns = useMemo<ColumnDef<IModuleDocumentMappingResponse>[]>(
    () => [
      {
        header: getTextByLanguage(
          t('document.documentTypeEn'),
          t('document.documentTypeNp')
        ),
        accessorKey: getTextByLanguage(
          'documentTypeResponse.documentTypeEn',
          'documentTypeResponse.documentTypeNp'
        ),
        cell: ({
          row: {
            original: {
              documentTypeResponse: { documentTypeEn, documentTypeNp },
              isMandatory,
            },
          },
        }) => (
          <span>
            {getTextByLanguage(documentTypeEn, documentTypeNp)}{' '}
            {isMandatory && (
              <span className="ml-1 font-semibold text-red-40">*</span>
            )}
          </span>
        ),
      },

      {
        header: t('document.allowedFileTypes'),
        accessorKey: 'documentTypeResponse.allowedFileTypes',
      },
      {
        header: t('document.maxFileSize'),
        accessorKey: 'documentTypeResponse.maxFileSize',
      },
      {
        header: t('document.uploadedFiles'),
        cell: ({
          row: {
            original: {
              documentTypeResponse: { id },
            },
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
        header: t('actions'),
        cell: ({ row: { original } }) => {
          const {
            documentTypeResponse: { allowedFileTypes, id },
          } = original
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
        show: !viewOnly,
      },
    ],
    [fileState.files, t]
  )

  const removeFileAction = async (file: FileData) => {
    if (currentViewDocument) {
      try {
        const currentFileState = { ...fileState }

        if (deleteAPIDetails && !file?.file) {
          const res = await initApiRequest<BackendSuccessResponse<null>>({
            apiDetails: deleteAPIDetails,
            params: {
              fileName: file.uuid,
            },
          })

          // if (res?.data?.message) {
          //   toast({ type: ToastType.success, message: res.data.message })
          // }
        }

        const updatedFileState = {
          ...currentFileState.files[currentViewDocument],
          filesData: currentFileState.files[
            currentViewDocument
          ].filesData.filter((currFile) => currFile.uuid !== file.uuid),
        }

        const newFileState = canUploadMultipleFile
          ? {
              ...currentFileState,
              files: {
                ...currentFileState.files,
                [currentViewDocument]: updatedFileState,
              },
            }
          : { ...currentFileState, file: { uuid: '', file: null } }

        if (canUploadMultipleFile && !updatedFileState.filesData.length) {
          setCurrentViewDocument('')
        }
        if (!canUploadMultipleFile) {
          setCurrentViewDocument('')
        }

        setFileState(newFileState)
        validateFileChanges(newFileState.files)
      } catch (error: any) {
        if (error?.error?.data?.error) {
          toast({ type: ToastType.error, message: error?.error?.data?.error })
        } else {
          toast({
            type: ToastType.error,
            message: getTextByLanguage(
              'Delete document failed',
              'कागजात मेटाउन असफल भयो'
            ),
          })
        }
      }
    }
  }

  return (
    <>
      <div className={className}>
        <div className="mt-4">
          <Text variant="h5" typeface="semibold">
            {title || t('document.title')}
          </Text>
        </div>

        <DataTable
          data={requiredDocumentList}
          columns={columns}
          isLoading={documentLoading}
          withScrollable={false}
        />

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
          removeFileAction={removeFileAction}
          controllerName={viewControllerName}
        />
      </div>

      {isUploading && <DocumentsUploadProgress value={uploadProgressValue} />}
    </>
  )
}

export default DocumentsUpload
