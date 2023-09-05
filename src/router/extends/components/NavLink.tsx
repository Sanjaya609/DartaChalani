import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { getComputedPath } from '@/router/extends/schema'

import type { NavLinkProps, RoutePaths } from '@/router/extends/route.types'

function CustomNavLink<Path extends RoutePaths>(props: NavLinkProps<Path>) {
  const { to, params, query, ...restPops } = props

  const computedTo = useMemo(() => {
    return getComputedPath({ path: to, params, query })
  }, [to, params, query])

  return <NavLink to={computedTo} {...restPops} />
}

export { CustomNavLink as NavLink }
