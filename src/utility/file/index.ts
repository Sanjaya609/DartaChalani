import { previewBlobType } from '@/utility/document/document-enum'
import downloadFile from '@/utility/document/fileDownloader'
import { previewFile } from '@/utility/document/preview-file'

export const isImageFile = (extension: string) =>
  ['jpg', 'jpeg', 'png', 'bmp', 'pdf'].includes(extension?.toLowerCase())

export const generateFileUrl = (fileUrl: string) => {
  let fullUrl
  if (fileUrl) {
    fullUrl = import.meta.env.VITE_API_ENDPOINT + fileUrl
  }
  return fullUrl
}
export const handleOpenFile = (fileUrl: string) => {
  if (fileUrl) {
    const url = generateFileUrl(fileUrl)
    window.open(url, '_target')
  }
}

export const handleDownloadFile = (fileUrl: string, filename?: string) => {
  if (fileUrl) {
    const url = generateFileUrl(fileUrl)
    if (url) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = filename || 'download'
          link.click()
        })
        .catch(console.error)
    }
  }
}

interface IHandleViewOrDownload {
  fileProps: {
    file: Blob | MediaSource
    fileType: string
    fileName?: string
  }
  action: 'download' | 'view'
}

export const handleViewOrDownload = (props: IHandleViewOrDownload) => {
  const {
    fileProps: { file, fileType, fileName = 'download' },
    action = 'view',
  } = props
  if (fileType) {
    if (action === 'view') {
      if (
        ['jpg', 'jpeg', 'png', 'bmp', 'pdf'].includes(fileType?.toLowerCase())
      ) {
        previewFile(file as Blob, previewBlobType[fileType])
      } else {
        downloadFile(file, fileName, previewBlobType[fileType])
      }
    } else if (action === 'download') {
      downloadFile(file, fileName, previewBlobType[fileType])
    }
  }
}
