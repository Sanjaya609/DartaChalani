import { privateRoutePath } from '@/router/routes/private/private-route.path'

export interface ISidebarItem {
  title: string
  path: ValueOf<typeof privateRoutePath>
  children?: ISidebarItem[]
  bypass?: boolean
}
