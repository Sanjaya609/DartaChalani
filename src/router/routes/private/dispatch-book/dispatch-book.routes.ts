import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

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
    checkPrivilege: [PRIVILEGEENUM.READ_LIST],
    children: [
      createRoute({
        path: privateRoutePath.dispatchBook.base,
        element: DispatchBookTable,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.add,
        element: AddDispatchBook,
        checkFromParentPath: privateRoutePath.dispatchBook.base,
        checkPrivilege: [PRIVILEGEENUM.CREATE],
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.view,
        element: DispatchBookDetailView,
        checkFromParentPath: privateRoutePath.dispatchBook.base,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.dispatchBook.edit,
        element: AddDispatchBook,
        checkFromParentPath: privateRoutePath.dispatchBook.base,
        checkPrivilege: [PRIVILEGEENUM.CREATE],
      }),
    ],
  }),
]
