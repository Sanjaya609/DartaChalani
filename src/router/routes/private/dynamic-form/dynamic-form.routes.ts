import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'
import { lazy } from 'react'
import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'

const DynamicForm = lazy(() => import('@/core/private/DynamicForm/DynamicForm'))
const DynamicFormModules = lazy(
  () =>
    import('@/core/private/DynamicForm/DynamicFormModules/DynamicFormModules')
)
const DynamicFormModuleTable = lazy(
  () =>
    import(
      '@/core/private/DynamicForm/DynamicFormModules/DynamicFormModuleTable/DynamicFormModuleTable'
    )
)

export const dynamicFormRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.dynamicForm.base,
    element: DynamicForm,
    checkPrivilege: [PRIVILEGEENUM.READ_LIST],
    isDynamicRoute: true,
    children: [
      createRoute({
        path: privateRoutePath.dynamicForm.formModules,
        element: DynamicFormModules,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
        isDynamicRoute: true,
        children: [
          createRoute({
            path: privateRoutePath.dynamicForm.formModules,
            element: DynamicFormModuleTable,
            checkPrivilege: [PRIVILEGEENUM.READ_LIST],
            isDynamicRoute: true,
          }),
        ],
      }),
    ],
  }),
]
