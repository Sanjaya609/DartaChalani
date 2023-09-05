import { publicRoutePath } from '@/router/routes/public/public-route.path'
import { privateRoutePath } from '@/router/routes/private/private-route.path'

const routePaths = {
  ...publicRoutePath,
  ...privateRoutePath,
} as const

export { publicRoutePath, privateRoutePath, routePaths }
