import { Location, useLocation } from 'react-router-dom'
import { RoutePaths } from '@/router/extends/route.types'

interface CustomLocation extends Omit<Location, 'pathname'> {
  pathname: RoutePaths
}

const useCustomLocation = (): CustomLocation => {
  return useLocation() as CustomLocation
}

export { useCustomLocation as useLocation }
export type { CustomLocation as Location }
