import RouteWrapper from '@/providers/RouteWrapper'
import type { RoutePaths, RouteType } from '@/router'
import React from 'react'
import { _RouteObject } from 'react-router-dom'
// import { toast } from 'react-toastify'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import FallbackLoader from '@/components/FallbackLoader'
import { IPRIVILEGEENUM, PRIVILEGEENUM } from '@/utility/enums/privilege.enum'
import { useAuth } from '@/providers'
import NotFound from '@/core/NotFound'
import { Text } from '@/components/ui/core/Text'
import { IModulePropsFromURL } from '@/utility/module/get-module-by-url-or-code'

export interface CreateRoute<Type extends RouteType>
  extends Omit<_RouteObject<Type>, 'element'> {
  element: React.LazyExoticComponent<React.FC>
  type?: RouteType
  checkFromParentPath?: RoutePaths
  checkPrivilege?: PRIVILEGEENUM[]
}

export interface IRoutePrivilege {
  routePrivilege: IPRIVILEGEENUM
  currentModuleDetails?: IModulePropsFromURL
}
interface IPermissionProps {
  RElement: React.LazyExoticComponent<React.FC<IRoutePrivilege>>
  path: RoutePaths
  checkFromParentPath?: RoutePaths
  checkPrivilege?: PRIVILEGEENUM[]
}

export const Permission = (props: IPermissionProps) => {
  const {
    RElement,
    path,
    checkFromParentPath,
    checkPrivilege = [PRIVILEGEENUM.READ_LIST],
  } = props
  const { flatModulePropsFromURL, initDataFetching } = useAuth()

  const currentPathDetails = checkFromParentPath
    ? flatModulePropsFromURL?.[checkFromParentPath]
    : flatModulePropsFromURL?.[path]

  if (initDataFetching) {
    return <FallbackLoader />
  }

  if (currentPathDetails) {
    const hasRouteAccess = !currentPathDetails?.isConfigurable
      ? true
      : checkPrivilege.some((checkPriv) =>
          currentPathDetails?.resourceResponses
            ?.map((priv) => priv.privilege)
            .includes(checkPriv)
        )

    const routePrivilege = currentPathDetails?.resourceResponses?.reduce<
      Partial<Record<PRIVILEGEENUM, boolean>>
    >((currPrivilege, resource) => {
      const mappedPrivilege = { ...currPrivilege }
      mappedPrivilege[resource.privilege as PRIVILEGEENUM] = true
      return mappedPrivilege
    }, {})

    return hasRouteAccess ? (
      <RouteWrapper>
        <RElement
          routePrivilege={routePrivilege}
          currentModuleDetails={currentPathDetails}
        />
      </RouteWrapper>
    ) : (
      <NotFound>
        <Text variant="small" color="text-cool-gray-600">
          No permission
        </Text>
      </NotFound>
    )
  }

  return <NotFound />
}

export function createRoute<Type extends RouteType = 'private'>(
  args: CreateRoute<Type>
): _RouteObject<Type> {
  const {
    element,
    path,
    checkFromParentPath,
    checkPrivilege,
    type = !checkPrivilege ? 'bypass' : undefined,
  } = args
  return {
    ...args,
    element:
      type && ['public', 'bypass'].includes(type) ? (
        <RouteWrapper>
          <args.element />
        </RouteWrapper>
      ) : (
        <Permission
          RElement={element}
          path={path as RoutePaths}
          checkFromParentPath={checkFromParentPath}
          checkPrivilege={checkPrivilege}
        />
      ),
    errorElement: <ErrorBoundary />,
  } as const
}
