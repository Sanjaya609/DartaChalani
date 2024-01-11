import RouteWrapper from '@/providers/RouteWrapper'
import { RoutePaths, RouteType, useLocation } from '@/router'
import React, { useMemo } from 'react'
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
  isDynamicRoute?: boolean
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
  isDynamicRoute?: boolean
}

export const Permission = (props: IPermissionProps) => {
  const {
    RElement,
    path,
    checkFromParentPath,
    checkPrivilege = [PRIVILEGEENUM.READ_LIST],
    isDynamicRoute = false,
  } = props
  const { flatModulePropsFromURL, initDataFetching } = useAuth()
  const location = useLocation()
  console.log({ checkFromParentPath })

  const currentPathDetails = useMemo<IModulePropsFromURL | undefined>(() => {
    let pathDetails: undefined | IModulePropsFromURL
    if (checkFromParentPath && isDynamicRoute) {
      const dynamicParent = location.pathname
      return flatModulePropsFromURL?.[location.pathname]
    } else if (isDynamicRoute) {
      return flatModulePropsFromURL?.[location.pathname]
    }

    pathDetails = checkFromParentPath
      ? flatModulePropsFromURL?.[checkFromParentPath]
      : flatModulePropsFromURL?.[path]

    return pathDetails
  }, [location.pathname])

  if (initDataFetching) {
    return <FallbackLoader />
  }

  if (currentPathDetails) {
    const hasRouteAccess =
      !currentPathDetails?.isConfigurable ||
      currentPathDetails?.dynamicFormApplicable ||
      currentPathDetails?.dynamicField
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
    isDynamicRoute,
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
          isDynamicRoute={isDynamicRoute}
        />
      ),
    errorElement: <ErrorBoundary />,
  } as const
}
