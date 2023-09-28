import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { FileStateFile, IFileState } from './document-upload.interface'
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
interface IMockData {
  documentTypeId: number
  allowedFileTypes: string[]
  isMandatory: boolean
}

const mockData = [
  {
    documentTypeId: 1,
    allowedFileTypes: ['PNG', 'JPG', 'JPEG'],
    isMandatory: true,
  },
  {
    documentTypeId: 2,
    allowedFileTypes: ['PNG', 'JPG', 'JPEG'],
    isMandatory: false,
  },
]

const DocumentsUpload = () => {
  const [fileState, setFileState] = useState<IFileState>({
    files: {},
    isRequiredFileUploaded: false,
  })

  const { data: requiredDocumentList = [] } =
    useGetAllDocumentListByModuleId('56')

  const { mutate: uploadDocument } = useDocumentUpload()

  const structureFileState = () => {
    if (requiredDocumentList) {
      const initialFileState = requiredDocumentList.reduce<FileStateFile>(
        (allFiles, currFile) => {
          allFiles[currFile.id] = {
            documentTypeId: currFile.id,
            file: null,
            guid: '',
            allowedFileTypes: currFile.allowedFileTypes,
            errors: [],
            isMandatory: currFile.isMandatory,
            documentTypeEn: currFile.documentTypeEn,
            documentTypeNp: currFile.documentTypeNp,
            maxFileSize: currFile.maxFileSize,
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
    }
  }

  useEffect(() => {
    structureFileState()
  }, [requiredDocumentList])

  const validateFileChanges = (files: FileStateFile) => {
    const isRequiredFileUploaded = Object.values(files)
      .filter((fileItem) => fileItem.isMandatory)
      .every((fileItem) => !!fileItem.file)

    setFileState((prevState) => ({
      ...prevState,
      isRequiredFileUploaded,
    }))
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
            const updatedFileState = {
              ...fileState,
              files: {
                ...fileState.files,
                [id]: {
                  ...fileState.files[id],
                  file: files[0],
                  uuid: res?.data.data.uuid,
                },
              },
            }

            setFileState(updatedFileState)
            validateFileChanges(updatedFileState.files)
          },
        }
      )
    }
  }

  console.log({ fileState })

  const columns = useMemo<ColumnDef<IDocumentTypeResponse>[]>(
    () => [
      {
        header: 'Document Name (English)',
        accessorKey: 'subSectorNameEnglish',
      },
      {
        header: 'Document Name (Nepali)',
        accessorKey: 'subSectorNameNepali',
      },
      {
        header: 'Required',
        accessorKey: 'required',
      },
      {
        header: 'Accepted Files',
        accessorKey: 'accepted File Types',
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
                    <span className="group relative">
                      <label htmlFor={`${id}`}>
                        <UploadSimple
                          className={tableActionIcon}
                          weight="fill"
                        />
                        <Box as="span" className={tableActionTooltip}>
                          Upload
                        </Box>
                      </label>
                      <input
                        // accept={acceptProps}
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
    [fileState.files]
  )

  return (
    <div className="h-full">
      <DataTable data={requiredDocumentList} columns={columns} />
    </div>
  )
}

export default DocumentsUpload
