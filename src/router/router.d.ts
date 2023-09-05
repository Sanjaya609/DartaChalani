/* eslint-disable */

import * as ReactRouterDom from 'react-router-dom'

import { privateRoutePath, publicRoutePath } from '@/router'

declare module 'react-router-dom' {
  export type RouteType = 'private' | 'public' | 'bypass'

  export interface _RouteObject<Type extends RouteType>
    extends Omit<ReactRouterDom.RouteObject, 'path' | 'index'> {
    path:
      | ValueOf<
          Type extends 'private'
            ? typeof privateRoutePath
            : typeof publicRoutePath
        >
      | '*'
  }
}
