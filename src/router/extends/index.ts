export * from 'react-router-dom'

export { Link } from '@/router/extends/components/Link'
export { NavLink } from '@/router/extends/components/NavLink'
export { Navigate } from '@/router/extends/components/Navigate'
export { useNavigate } from '@/router/extends/hooks/useNavigate'
export { useLocation } from '@/router/extends/hooks/useLocation'
export { useMatch } from '@/router/extends/hooks/useMatch'

export type {
  RoutePaths,
  RouteQuery,
  RouteType,
  RouteParams,
  RouteAddons,
  ParamOnly,
  PathSegments,
  NavigateFunction,
  NavigateProps,
  LinkProps,
  NavLinkProps,
  RouteProps,
} from '@/router/extends/route.types'
export { getComputedPath } from '@/router/extends/schema'
