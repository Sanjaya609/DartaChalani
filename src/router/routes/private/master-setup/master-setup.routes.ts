import { createRoute } from '@/router/routes/create-route'
import { privateRoutePath } from '@/router/routes/private/private-route.path'
import React from 'react'
import { _RouteObject } from 'react-router-dom'

const MasterSetup = React.lazy(
  () => import('@/core/private/MasterSetup/MasterSetup')
)
const FiscalYear = React.lazy(
  () => import('@/core/private/MasterSetup/FiscalYear')
)

export const masterSetupRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.masterSetup.base,
    element: MasterSetup,
    children: [
      createRoute({
        path: privateRoutePath.masterSetup.fiscalYear,
        element: FiscalYear,
      }),
    ],
  }),
]
