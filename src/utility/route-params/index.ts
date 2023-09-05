export const encodeParams = <T>(params: T) => {
  try {
    return btoa(encodeURIComponent(JSON.stringify(params)))
  } catch (e) {
    return ''
  }
}

/** JSON Object string */
export const decodeParams = <T>(params?: string): T | null => {
  if (params) {
    try {
      return JSON.parse(decodeURIComponent(atob(params)))
    } catch (e) {
      return null
    }
  }
  return null
}
