import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'

const RegistrationBook = React.lazy(
  () => import('@/core/private/RegistrationBook')
)
const RegistrationBookTable = React.lazy(
  () => import('@/core/private/RegistrationBook/RegistrationBookTable')
)
const AddRegistrationBook = React.lazy(
  () => import('@/core/private/RegistrationBook/AddRegistrationBook')
)
const RegistrationBookDetailView = React.lazy(
  () => import('@/core/private/RegistrationBook/RegistrationBookDetailView')
)

export const registrationBookRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.dispatchBook.base,
    element: RegistrationBook,
    children: [
      createRoute({
        path: privateRoutePath.dispatchBook.base,
        element: RegistrationBookTable,
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.add,
        element: AddRegistrationBook,
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.view,
        element: RegistrationBookDetailView,
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.edit,
        element: AddRegistrationBook,
      }),
    ],
  }),
]
