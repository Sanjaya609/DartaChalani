import { createRoute } from '@/router/routes/create-route'
import { publicRoutePath } from '@/router/routes/public/public-route.path'
import React from 'react'
import { _RouteObject } from 'react-router-dom'

const NotFound = React.lazy(() => import('@/core/NotFound'))
const Login = React.lazy(() => import('@/core/public/Login/Login'))

export const publicRoutes: _RouteObject<'public'>[] = [
  createRoute({
    path: publicRoutePath.login,
    element: Login,
    type: 'public',
  }),

  createRoute({
    path: '*',
    element: NotFound,
    type: 'public',
  }),
]
