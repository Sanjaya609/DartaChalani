import { createRoute } from '@/router/routes/create-route'
import { privateRoutePath } from '@/router/routes/private/private-route.path'
import React from 'react'
import { _RouteObject } from 'react-router-dom'
import { masterSetupRoutes } from './master-setup/master-setup.routes'
import { securityRoutes } from './security/security.routes'

const Boundary = React.lazy(() => import('@/core/private/Boundary'))

const NotFound = React.lazy(() => import('@/core/NotFound'))

export const privateRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.base,
    element: Boundary,
    type: 'bypass',
    children: [
      ...masterSetupRoutes,
      ...securityRoutes],
  }),

  createRoute({
    path: '*',
    element: NotFound,
    type: 'bypass',
  }),
]
