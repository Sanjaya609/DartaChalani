import { MimeType } from './document-enum'

export const previewFile = (blobFile: Blob, type = MimeType.pdf) => {
  const file = new Blob([blobFile], { type })
  const fileURL = URL.createObjectURL(file)
  window.open(fileURL, '_blank')
}
