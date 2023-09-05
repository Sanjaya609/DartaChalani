import {
  pathParamSanitizer,
  pathQuerySanitizer,
} from '@/utility/sanitizer/sanitizer'
import type { RouteQuery } from '@/router/extends/route.types'
import { Primitive } from 'type-fest'

export function getComputedPath<Path extends string>(args: {
  path: Path
  params?: GenericObj<Primitive> | undefined
  query?: RouteQuery
}) {
  const { params, query, path } = args

  let computedPath = path

  if (Object.keys(params || {})?.length) {
    computedPath = pathParamSanitizer(
      pathQuerySanitizer(computedPath as string, query),
      params,
      ':'
    ) as Path
  }

  return computedPath
}
