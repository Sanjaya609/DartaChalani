import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getComputedPath } from '@/router/extends/schema'

import type { LinkProps, RoutePaths } from '@/router/extends/route.types'

function CustomLinks<Path extends RoutePaths>(props: LinkProps<Path>) {
  const { to, params, query, ...restPops } = props

  const computedTo = useMemo(() => {
    return getComputedPath({ path: to, params, query })
  }, [to, params, query])

  return <Link to={computedTo} {...restPops} />
}

export { CustomLinks as Link }
