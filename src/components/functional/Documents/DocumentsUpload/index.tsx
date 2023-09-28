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

  const structureFileState = () => {
    const initialFileState = mockData.reduce<FileStateFile>(
      (allFiles, currFile) => {
        allFiles[currFile.documentTypeId] = {
          documentTypeId: currFile.documentTypeId,
          file: null,
          guid: '',
          allowedFileTypes: currFile.allowedFileTypes,
          errors: [],
          isMandatory: currFile.isMandatory,
        }
        return allFiles
      },
      {}
    )

    const isRequiredFileUploaded = mockData.some((file) => file.isMandatory)

    setFileState({
      files: initialFileState,
      isRequiredFileUploaded,
    })
  }

  useEffect(() => {
    structureFileState()
  }, [])

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
      const updatedFileState = {
        ...fileState,
        files: {
          ...fileState.files,
          [id]: {
            ...fileState.files[id],
            file: files[0],
          },
        },
      }

      setFileState(updatedFileState)
      validateFileChanges(updatedFileState.files)
    }
  }

  console.log({ fileState })

  const columns = useMemo<ColumnDef<IMockData>[]>(
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
          const { documentTypeId } = original
          return (
            <TableAction
              otherActionsComp={
                <>
                  <li className={tableActionList}>
                    <span className="group relative">
                      <label htmlFor={`${documentTypeId}`}>
                        <UploadSimple
                          className={tableActionIcon}
                          weight="fill"
                        />
                        <Box as="span" className={tableActionTooltip}>
                          Upload
                        </Box>
                      </label>
                      <input
                        onChange={handleInputFileChange}
                        id={`${documentTypeId}`}
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
      <DataTable data={mockData} columns={columns} />
    </div>
  )
}

export default DocumentsUpload
