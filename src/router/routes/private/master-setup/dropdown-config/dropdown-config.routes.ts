import { routePaths } from '@/router/routes'
import { createRoute } from '@/router/routes/create-route'
import { privateRoutePath } from '@/router/routes/private/private-route.path'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'
import React from 'react'
import { _RouteObject } from 'react-router-dom'

const DropdownConfig = React.lazy(
  () => import('@/core/private/MasterSetup/DropdownConfig')
)
const DropdownConfigTable = React.lazy(
  () => import('@/core/private/MasterSetup/DropdownConfig/DropdownConfigTable')
)
const AddDropDownConfig = React.lazy(
  () => import('@/core/private/MasterSetup/DropdownConfig/AddDropDownConfig')
)

export const dropdownConfigRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.masterSetup.dropdownConfig.base,
    element: DropdownConfig,
    checkPrivilege: [PRIVILEGEENUM.READ],
    children: [
      createRoute({
        path: privateRoutePath.masterSetup.dropdownConfig.base,
        element: DropdownConfigTable,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      createRoute({
        path: privateRoutePath.masterSetup.dropdownConfig.add,
        element: AddDropDownConfig,
        checkFromParentPath: routePaths.masterSetup.dropdownConfig.base,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
      createRoute({
        path: privateRoutePath.masterSetup.dropdownConfig.edit,
        element: AddDropDownConfig,
        checkFromParentPath: routePaths.masterSetup.dropdownConfig.base,
        checkPrivilege: [PRIVILEGEENUM.READ],
      }),
    ],
  }),
]
