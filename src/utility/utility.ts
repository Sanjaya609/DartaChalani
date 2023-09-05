export interface LanguageItem {
  id?: number
  nameEnglish: string
  nameNepali: string
}
// eslint-disable-next-line
export const isFunction = (obj: unknown): obj is Function =>
  typeof obj === 'function'

export const truncate = (str: string, length = 15) => {
  if (str.length > length) {
    return `${str.slice(0, length)}...`
  }
  return str
}

export const getLabelAndTitleFromArray = (
  extentionsList: Array<string>,
  splitItems: number
) => {
  const predecesor = [...extentionsList].splice(0, splitItems)
  const sucessor = [...extentionsList].splice(splitItems)
  return {
    text:
      extentionsList.length > splitItems
        ? `${predecesor.join(' , ')} + ${sucessor.length}`
        : extentionsList.join(' , '),
    title: sucessor.join(' , '),
  }
}

export const getTruncatedFileNameByLength = (fileName: string, length = 33) => {
  const extension = fileName.split('.').pop() || ''
  const newFileName = fileName.substring(
    0,
    fileName.length - extension.length - 1
  )
  return newFileName?.length > length
    ? `${truncate(newFileName, length)}.${extension}`
    : fileName
}
