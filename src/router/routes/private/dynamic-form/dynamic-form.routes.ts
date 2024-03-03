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

const AddDynamicForm = lazy(
  () =>
    import(
      '@/core/private/DynamicForm/DynamicFormModules/AddDynamicForm/AddDynamicForm'
    )
)

const ViewDynamicFormValue = lazy(
  () =>
    import(
      '@/core/private/DynamicForm/DynamicFormModules/DynamicFormDetailView/DynamicFormDetailView'
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
  createRoute({
    path: privateRoutePath.dynamicForm.add,
    element: AddDynamicForm,
    checkPrivilege: [PRIVILEGEENUM.CREATE],
    isDynamicRoute: true,
    checkFromParentPath: privateRoutePath.dynamicForm.formModules,
  }),
  createRoute({
    path: privateRoutePath.dynamicForm.edit,
    element: AddDynamicForm,
    checkPrivilege: [PRIVILEGEENUM.UPDATE],
    isDynamicRoute: true,
    checkFromParentPath: privateRoutePath.dynamicForm.formModules
  }),
  createRoute({
    path: privateRoutePath.dynamicForm.view,
    element: ViewDynamicFormValue,
    checkPrivilege: [PRIVILEGEENUM.READ],
    isDynamicRoute: true,
    checkFromParentPath: privateRoutePath.dynamicForm.formModules
  })
]
