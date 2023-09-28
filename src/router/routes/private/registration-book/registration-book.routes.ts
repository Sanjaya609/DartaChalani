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

export const registrationBookRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.registrationBook.base,
    element: RegistrationBook,
    children: [
      createRoute({
        path: privateRoutePath.registrationBook.base,
        element: RegistrationBookTable,
      }),
      createRoute({
        path: privateRoutePath.registrationBook.add,
        element: AddRegistrationBook,
      }),
    ],
  }),
]
