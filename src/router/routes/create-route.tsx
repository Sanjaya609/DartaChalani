import RouteWrapper from '@/providers/RouteWrapper'
import type { RoutePaths, RouteType } from '@/router'
import React from 'react'
import { _RouteObject } from 'react-router-dom'
// import { toast } from 'react-toastify'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'

export interface CreateRoute<Type extends RouteType>
  extends Omit<_RouteObject<Type>, 'element'> {
  element: React.LazyExoticComponent<React.FC>
  type?: RouteType
}

interface IPermissionProps {
  RElement: React.LazyExoticComponent<React.FC>
  path: RoutePaths
  checkFromParentPath?: RoutePaths
}

// export const Permission = (props: IPermissionProps) => {
//   const {
//     RElement,
//     path,
//     checkFromParentPath,
//     checkPrivilege = [PRIVILEGEENUM.READLIST],
//   } = props
//   const { flatModulePropsFromURL, initDataFetching } = useAuth()

//   console.log({ flatModulePropsFromURL })

//   const currentPathDetails = checkFromParentPath
//     ? flatModulePropsFromURL?.[checkFromParentPath]
//     : flatModulePropsFromURL?.[path]

//   if (initDataFetching) {
//     return <>loading...</>
//   }

//   if (currentPathDetails) {
//     // const hasRouteAccess = currentPathDetails?.isConfigurable === false
//     const hasRouteAccess = !currentPathDetails?.isConfigurable
//       ? true
//       : checkPrivilege.some((checkPriv) =>
//           currentPathDetails?.privilege
//             ?.map((priv) => priv.code)
//             .includes(checkPriv)
//         )

//     const routePrivilege = currentPathDetails?.privilege?.reduce<
//       Partial<Record<PRIVILEGEENUM, boolean>>
//     >((currPrivilege, privilege) => {
//       const mappedPrivilege = { ...currPrivilege }
//       mappedPrivilege[privilege.code] = true
//       return mappedPrivilege
//     }, {})

//     return hasRouteAccess ? (
//       <RouteWrapper>
//         <RElement routePrivilege={routePrivilege} />
//       </RouteWrapper>
//     ) : (
//       <NotFound>
//         <Text variant="small" color="text-cool-gray-600">
//           No permission
//         </Text>
//       </NotFound>
//     )
//   }

//   return <NotFound />
// }

export function createRoute<Type extends RouteType = 'private'>(
  args: CreateRoute<Type>
): _RouteObject<Type> {
  return {
    ...args,
    element: (
      <RouteWrapper>
        <args.element />
      </RouteWrapper>
    ),
    errorElement: <ErrorBoundary />,
  } as const
}
