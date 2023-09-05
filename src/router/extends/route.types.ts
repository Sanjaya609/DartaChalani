import { routePaths } from '@/router/routes'
import { Primitive } from 'type-fest'
import { LinkProps, NavigateOptions, NavLinkProps } from 'react-router-dom'
import { RouteProps } from 'react-router'

export type PathSegments<Path> =
  Path extends `${infer SegmentA}/${infer SegmentB}`
    ? ParamOnly<SegmentA> | PathSegments<SegmentB>
    : ParamOnly<Path>

export type ParamOnly<Segment> = Segment extends `:${infer Param}`
  ? Param
  : never

export type RouteParams<Path> = {
  [Key in PathSegments<Path>]?: string
}

export type RoutePaths<RoutePath = typeof routePaths> = ValueOf<RoutePath>

export type RouteType = 'private' | 'public' | 'bypass'

export type RouteQuery = GenericObj<Primitive | Array<Primitive>>

export interface RouteAddons<
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _Path extends RoutePaths
> {
  to: _Path
  params?: { readonly [Key in PathSegments<_Path>]: string }
  query?: GenericObj<Primitive | Array<Primitive>>
}

type CustomLinkProps<Path extends RoutePaths> = Omit<LinkProps, 'to'> &
  RouteAddons<Path>

type CustomNavLinkProps<Path extends RoutePaths> = Omit<NavLinkProps, 'to'> &
  RouteAddons<Path>

type CustomNavigateProps<Path extends RoutePaths> = Omit<NavLinkProps, 'to'> &
  RouteAddons<Path>

interface NavigateFunction<Path extends RoutePaths> {
  (
    to: Path,
    options?: NavigateOptions & {
      params?: Partial<{ readonly [Key in PathSegments<Path>]: string }>
      query?: GenericObj<Primitive | Array<Primitive>>
    }
  ): void

  (delta: number): void
}

interface CustomRouteProps extends Omit<RouteProps, 'path' | 'index'> {
  path: RoutePaths
}

export type {
  CustomNavLinkProps as NavLinkProps,
  CustomLinkProps as LinkProps,
  CustomNavigateProps as NavigateProps,
  CustomRouteProps as RouteProps,
  NavigateFunction,
}
