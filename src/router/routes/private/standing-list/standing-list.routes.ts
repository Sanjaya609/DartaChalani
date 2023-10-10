import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'

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
    children: [
      createRoute({
        path: privateRoutePath.standingList.base,
        element: StandingListTable,
      }),
      createRoute({
        path: privateRoutePath.standingList.add,
        element: AddStandingList,
      }),
      createRoute({
        path: privateRoutePath.standingList.view,
        element: StandingListDetailView,
      }),
      createRoute({
        path: privateRoutePath.standingList.edit,
        element: AddStandingList,
      }),
    ],
  }),
]
