export type FileStateFile = Record<
  string,
  {
    documentTypeId: StringNumber
    file: Blob | MediaSource | null
    guid: string
    allowedFileTypes: string[]
    errors: string[]
    isMandatory: boolean
  }
>

export interface IFileState {
  files: FileStateFile
  isRequiredFileUploaded: boolean
}
