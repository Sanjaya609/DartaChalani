import { useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { getComputedPath } from '@/router/extends/schema'

import type { NavigateProps, RoutePaths } from '@/router/extends/route.types'

function CustomNavigate<Path extends RoutePaths>(props: NavigateProps<Path>) {
  const { to, params, query, ...restPops } = props

  const computedTo = useMemo(() => {
    return getComputedPath({ path: to, params, query })
  }, [to, params, query])

  return <Navigate to={computedTo} {...restPops} />
}

export { CustomNavigate as Navigate }
