import { MimeType } from './document-enum'

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

interface IValidateDocumentFile {
  file: Blob
  maxFileSize: number
  allowedFileTypes: string[]
}

export const validateDocumentFile = (props: IValidateDocumentFile) => {
  const { file, maxFileSize, allowedFileTypes } = props
  const maxSizeInByte = maxFileSize * 1024
  console.log({ props })

  const mimeTypeAllowedFileType = allowedFileTypes?.map(
    (fileType) => MimeType[fileType.toLowerCase() as keyof typeof MimeType]
  )

  if (!mimeTypeAllowedFileType.includes(file.type as MimeType)) {
    const splitAllowFileType = allowedFileTypes.join(', ')
    return [
      `Please upload ${splitAllowFileType} file only`,
      `कृपया ${splitAllowFileType} फाइल मात्र अपलोड गर्नुहोस्`,
    ]
  }

  if (file.size > maxSizeInByte) {
    return [
      `Please upload file upto ${maxFileSize} KB`,
      `कृपया ${maxFileSize} KB सम्मको फाइल अपलोड गर्नुहोस्`,
    ]
  }

  return []
}
