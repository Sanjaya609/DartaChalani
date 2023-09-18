import { privateRoutePath } from '@/router'
import { TFuncKey } from 'i18next'
import { LayoutDashboard, Settings, ServerCog } from 'lucide-react'
import { IconProps } from 'phosphor-react'

interface ISidebarNavList {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  path: ValueOf<typeof privateRoutePath>
  title: TFuncKey<'translation'>
}

export const sidebarNavList: ISidebarNavList[] = [
  {
    icon: LayoutDashboard,
    path: privateRoutePath.base,
    title: 'sidebar.dashboard',
  },
  {
    icon: Settings,
    path: privateRoutePath.masterSetup.base,
    title: 'sidebar.masterSetup.title',
  },
  {
    icon: ServerCog,
    path: privateRoutePath.security.base,
    title: 'sidebar.security',
  },
]
