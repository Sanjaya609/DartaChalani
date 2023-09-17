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
const Sector = React.lazy(() => import('@/core/private/MasterSetup/Sector'))
const ServiceType = React.lazy(
  () => import('@/core/private/MasterSetup/ServiceType')
)
const DocumentType = React.lazy(
  () => import('@/core/private/MasterSetup/DocumentType')
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
      createRoute({
        path: privateRoutePath.masterSetup.sector,
        element: Sector,
      }),
      createRoute({
        path: privateRoutePath.masterSetup.serviceType,
        element: ServiceType,
      }),
      createRoute({
        path: privateRoutePath.masterSetup.documentType,
        element: DocumentType,
      }),
    ],
  }),
]
