export type FileData = {
  uuid: string
  file: Blob | null
}

export interface IFileStateFileValue {
  documentTypeId: StringNumber
  fileData?: FileData
  allowedFileTypes: string[]
  errors: string[]
  isMandatory: boolean
  maxFileSize: number
  documentTypeEn: string
  documentTypeNp: string
  filesData: FileData[]
}

export type FileStateFile = Record<string, IFileStateFileValue>

export interface IFileState {
  files: FileStateFile
  isRequiredFileUploaded: boolean
}
