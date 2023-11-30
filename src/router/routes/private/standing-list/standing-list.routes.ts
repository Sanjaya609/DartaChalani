import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

const StandingListOutlet = React.lazy(
  () => import('@/core/private/StandingList')
)

const StandingListTable = React.lazy(
  () => import('@/core/private/StandingList/StandingListTable')
)

const AddStandingList = React.lazy(
  () => import('@/core/private/StandingList/AddStandingList')
)
const StandingListDetailView = React.lazy(
  () => import('@/core/private/StandingList/StandingListDetailView')
)

export const standingListRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.standingList.base,
    element: StandingListOutlet,
    checkPrivilege: [PRIVILEGEENUM.READ_LIST],
    children: [
      createRoute({
        path: privateRoutePath.standingList.base,
        element: StandingListTable,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.standingList.add,
        element: AddStandingList,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
        checkFromParentPath: privateRoutePath.standingList.base,
      }),
      createRoute({
        path: privateRoutePath.standingList.view,
        element: StandingListDetailView,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
        checkFromParentPath: privateRoutePath.standingList.base,
      }),
      createRoute({
        path: privateRoutePath.standingList.edit,
        element: AddStandingList,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
        checkFromParentPath: privateRoutePath.standingList.base,
      }),
    ],
  }),
]
