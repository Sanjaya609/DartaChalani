import type { RouteQuery } from '@/router/extends'
import { Primitive } from 'type-fest'

export const pathParamSanitizer = (
  path: string,
  params: GenericObj<Primitive> | undefined,
  identifier: '{}' | ':' = ':'
) => {
  return Object.entries(params || {}).reduce(
    // eslint-disable-next-line no-return-assign
    (acc, [key, value]) =>
      // eslint-disable-next-line no-param-reassign,no-return-assign
      (acc = acc.replace(
        identifier === '{}' ? `{${key}}` : `:${key}`,
        String(value)
      )),
    path
  )
}

export const pathQuerySanitizer = (path: string, query?: RouteQuery) => {
  if (!query) return path
  const urlSearchParams = new URLSearchParams()

  Object.entries(query).forEach((entry) => {
    urlSearchParams.set(entry[0], String(entry[1]))
  })

  let sanitizedPath = urlSearchParams.toString()

  sanitizedPath = `${path}${path.includes('?') ? '' : '?'}${sanitizedPath}`

  return sanitizedPath
}
