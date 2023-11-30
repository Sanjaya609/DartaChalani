import { createRoute } from '@/router/routes/create-route'
import { privateRoutePath } from '@/router/routes/private/private-route.path'
import React from 'react'
import { _RouteObject } from 'react-router-dom'
import { dropdownConfigRoutes } from './dropdown-config/dropdown-config.routes'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

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
const Office = React.lazy(() => import('@/core/private/MasterSetup/Office'))
const ModuleDocumentMapping = React.lazy(
  () => import('@/core/private/MasterSetup/ModuleDocumentMapping')
)

export const masterSetupRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.masterSetup.base,
    element: MasterSetup,
    checkPrivilege: [PRIVILEGEENUM.READ],
    children: [
      createRoute({
        path: privateRoutePath.masterSetup.fiscalYear,
        element: FiscalYear,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      createRoute({
        path: privateRoutePath.masterSetup.sector,
        element: Sector,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      createRoute({
        path: privateRoutePath.masterSetup.serviceType,
        element: ServiceType,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      createRoute({
        path: privateRoutePath.masterSetup.documentType,
        element: DocumentType,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      createRoute({
        path: privateRoutePath.masterSetup.office,
        element: Office,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      createRoute({
        path: privateRoutePath.masterSetup.moduleDocumentMapping,
        element: ModuleDocumentMapping,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      ...dropdownConfigRoutes,
    ],
  }),
]
