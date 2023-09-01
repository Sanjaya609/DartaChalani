/* eslint-disable @typescript-eslint/no-explicit-any */
export function exportToWord(html: string, filename = '') {

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword',
  })

  // Specify link url
  const url = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(
    html
  )}`

  // Specify file name
  const wordFilename = `${filename}.doc` || 'document.doc'

  // Create download link element
  const downloadLink = document.createElement('a')

  document.body.appendChild(downloadLink)

  if ((navigator as any).msSaveOrOpenBlob) {
    ; (navigator as any).msSaveOrOpenBlob(blob, wordFilename)
  } else {
    // Create a link to the file
    downloadLink.href = url

    // Setting the file name
    downloadLink.download = wordFilename

    // triggering the function
    downloadLink.click()
  }

  document.body.removeChild(downloadLink)
}
