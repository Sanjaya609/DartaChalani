import { createRoute } from '@/router/routes/create-route'
import { privateRoutePath } from '@/router/routes/private/private-route.path'
import React from 'react'
import { _RouteObject } from 'react-router-dom'

const Boundary = React.lazy(() => import('@/core/private/Boundary'))

const NotFound = React.lazy(() => import('@/core/NotFound'))

export const privateRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.base,
    element: Boundary,
    type: 'bypass',
    children: [
      //routes heere
    ],
  }),

  createRoute({
    path: '*',
    element: NotFound,
    type: 'bypass',
  }),
]
