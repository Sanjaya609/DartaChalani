import { lazy } from 'react'
import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'

const DynamicForm = lazy(
  () => import('@/core/private/DynamicForm/AddDynamicForm/AddDynamicForm')
)

export const dynamicFormRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.dynamicForm.base,
    element: DynamicForm,
    children: [
      // createRoute({
      //   path: privateRoutePath.dispatchBook.base,
      //   element: DispatchBookTable,
      //   checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      // }),
    ],
  }),
]
