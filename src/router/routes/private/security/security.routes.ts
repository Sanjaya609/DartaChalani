import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'

const Security = React.lazy(() => import('@/core/private/Security/Security'))
const ModuleSetup = React.lazy(
  () => import('@/core/private/Security/ModuleSetup')
)

const RoleSetup = React.lazy(() => import('@/core/private/Security/RoleSetup'))

const EmailSetup = React.lazy(
  () => import('@/core/private/Security/EmailSetup')
)

export const securityRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.security.base,
    element: Security,
    children: [
      createRoute({
        path: privateRoutePath.security.moduleSetup,
        element: ModuleSetup,
      }),
      createRoute({
        path: privateRoutePath.security.roleSetup,
        element: RoleSetup,
      }),
      createRoute({
        path: privateRoutePath.security.emailSetup,
        element: EmailSetup,
      }),
    ],
  }),
]
