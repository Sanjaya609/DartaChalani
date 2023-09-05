import { useCallback } from 'react'
import { To, useNavigate } from 'react-router-dom'

import { getComputedPath } from '@/router/extends/schema'
import { NavigateFunction, RoutePaths } from '@/router/extends/route.types'

function useCustomNavigate<Path extends RoutePaths>(): NavigateFunction<Path> {
  const navigate = useNavigate()

  return useCallback(
    (to, options) => {
      navigate(
        (typeof to === 'number'
          ? to
          : getComputedPath({
              path: to,
              params: options?.params,
              query: options?.query,
            })) as To,
        options
      )
    },
    [navigate]
  ) as NavigateFunction<Path>
}

export { useCustomNavigate as useNavigate }
