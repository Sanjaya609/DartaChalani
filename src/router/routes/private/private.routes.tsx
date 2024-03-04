import { createRoute } from '@/router/routes/create-route'
import { privateRoutePath } from '@/router/routes/private/private-route.path'
import React from 'react'
import { _RouteObject } from 'react-router-dom'
import { masterSetupRoutes } from './master-setup/master-setup.routes'
import { securityRoutes } from './security/security.routes'
import { standingListRoutes } from './standing-list/standing-list.routes'
import { registrationBookRoutes } from './registration-book/registration-book.routes'
import { dispatchBookRoutes } from './dispatch-book/dispatch-book.routes'
import { recommendationSetupRoutes } from './recommendation/recommendation.routes'
import { dynamicFormRoutes } from './dynamic-form/dynamic-form.routes'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

const Boundary = React.lazy(() => import('@/core/private/Boundary'))
const NotFound = React.lazy(() => import('@/core/NotFound'))

const Dashboard = React.lazy(() => import('@/core/private/Dashboard'))

export const privateRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.base,
    element: Boundary,
    type: 'bypass',
    children: [
      createRoute({
        path: privateRoutePath.dashboard,
        element: Dashboard,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
        type: 'bypass',
      }),
      ...masterSetupRoutes,
      ...securityRoutes,
      ...standingListRoutes,
      ...registrationBookRoutes,
      ...dispatchBookRoutes,
      ...recommendationSetupRoutes,
      ...dynamicFormRoutes,
    ],
  }),

  createRoute({
    path: '*',
    element: NotFound,
    type: 'bypass',
  }),
]
