import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

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
    path: privateRoutePath.registrationBook.base,
    element: RegistrationBook,
    checkPrivilege: [PRIVILEGEENUM.READ_LIST],

    children: [
      createRoute({
        path: privateRoutePath.registrationBook.base,
        element: RegistrationBookTable,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.registrationBook.add,
        element: AddRegistrationBook,
        checkFromParentPath: privateRoutePath.registrationBook.base,
        checkPrivilege: [PRIVILEGEENUM.CREATE],
      }),
      createRoute({
        path: privateRoutePath.registrationBook.view,
        element: RegistrationBookDetailView,
        checkFromParentPath: privateRoutePath.registrationBook.base,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.registrationBook.edit,
        element: AddRegistrationBook,
        checkPrivilege: [PRIVILEGEENUM.CREATE, PRIVILEGEENUM.UPDATE],
        checkFromParentPath: privateRoutePath.registrationBook.base,
      }),
    ],
  }),
]
