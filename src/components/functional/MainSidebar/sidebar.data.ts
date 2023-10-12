import { privateRoutePath } from '@/router'
import { TFuncKey } from 'i18next'
import { LayoutDashboard, Settings, ServerCog, Library } from 'lucide-react'
import { IconProps, Notebook } from 'phosphor-react'

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
    title: 'sidebar.security.title',
  },
  {
    icon: Library,
    path: privateRoutePath.standingList.base,
    title: 'sidebar.standingList',
  },
  {
    icon: Notebook,
    path: privateRoutePath.registrationBook.base,
    title: 'sidebar.registrationBook',
  },
  {
    icon: Notebook,
    path: privateRoutePath.dispatchBook.base,
    title: 'sidebar.dispatchBook',
  },
]
