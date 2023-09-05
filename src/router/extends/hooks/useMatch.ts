import { useMatch } from 'react-router-dom'
import { RoutePaths } from '@/router/extends/route.types'

function useCustomMatch<Path extends RoutePaths>(path: Path) {
  return useMatch(path)
}

export { useCustomMatch as useMatch }
