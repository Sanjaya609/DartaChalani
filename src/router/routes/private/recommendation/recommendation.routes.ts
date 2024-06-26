import { _RouteObject } from 'react-router-dom'
import { createRoute } from '../../create-route'
import { privateRoutePath } from '../private-route.path'
import React from 'react'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

const Recommendation = React.lazy(
  () => import('@/core/private/Recommendation')
)
const RecommendationTable = React.lazy(
  () => import('@/core/private/Recommendation/RecommendationTable')
)

const ConfigureRecommendation = React.lazy(
  () => import('@/core/private/Recommendation/Fields')
)

export const recommendationSetupRoutes: _RouteObject<'private'>[] = [
  createRoute({
    path: privateRoutePath.recommendation.base,
    element: Recommendation,
    checkPrivilege: [PRIVILEGEENUM.READ_LIST],

    children: [
      createRoute({
        path: privateRoutePath.recommendation.base,
        element: RecommendationTable,
        checkPrivilege: [PRIVILEGEENUM.READ_LIST],
      }),
      createRoute({
        path: privateRoutePath.recommendation.configure,
        element: ConfigureRecommendation,
        checkFromParentPath: privateRoutePath.recommendation.base,
        checkPrivilege: [PRIVILEGEENUM.READ]
      })
    ],
  }),
]
