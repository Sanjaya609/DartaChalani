import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'

const DispatchBook = React.lazy(() => import('@/core/private/DispatchBook'))
const DispatchBookTable = React.lazy(
  () => import('@/core/private/DispatchBook/DispatchBookTable')
)
const AddDispatchBook = React.lazy(
  () => import('@/core/private/DispatchBook/AddDispatchBook')
)
const DispatchBookDetailView = React.lazy(
  () => import('@/core/private/DispatchBook/DispatchBookDetailView')
)

export const dispatchBookRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.dispatchBook.base,
    element: DispatchBook,
    children: [
      createRoute({
        path: privateRoutePath.dispatchBook.base,
        element: DispatchBookTable,
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.add,
        element: AddDispatchBook,
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.view,
        element: DispatchBookDetailView,
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.edit,
        element: AddDispatchBook,
      }),
    ],
  }),
]
