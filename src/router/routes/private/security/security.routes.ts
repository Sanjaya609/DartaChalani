import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

const Security = React.lazy(() => import('@/core/private/Security/Security'))
const ModuleSetup = React.lazy(
  () => import('@/core/private/Security/ModuleSetup')
)

const RoleSetup = React.lazy(() => import('@/core/private/Security/RoleSetup'))
const RoleModuleMapping = React.lazy(
  () => import('@/core/private/Security/RoleModuleMapping/index')
)

const EmailSetup = React.lazy(
  () => import('@/core/private/Security/EmailSetup')
)

const UserSetup = React.lazy(() => import('@/core/private/Security/UserSetup'))

export const securityRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.security.base,
    element: Security,
    checkPrivilege: [],
    children: [
      createRoute({
        path: privateRoutePath.security.moduleSetup,
        element: ModuleSetup,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.security.roleManagement,
        element: RoleSetup,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.security.roleModuleMapping,
        element: RoleModuleMapping,
        checkFromParentPath: privateRoutePath.security.roleManagement,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.security.emailSetup,
        element: EmailSetup,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.security.userSetup,
        element: UserSetup,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
    ],
  }),
]
