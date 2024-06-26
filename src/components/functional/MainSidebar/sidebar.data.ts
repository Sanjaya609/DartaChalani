import { privateRoutePath } from '@/router'
import { TFuncKey } from 'i18next'
import { LayoutDashboard, Settings, ServerCog, Library } from 'lucide-react'
import { IconProps, Notebook, Ticket, Keyboard } from 'phosphor-react'

export interface ISidebarNavList {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  path: ValueOf<typeof privateRoutePath>
  title: TFuncKey<'translation'> | string
  bypass?: boolean
  titleEn?: string
  titleNp?: string
}

export const sidebarNavList: ISidebarNavList[] = [
  {
    icon: LayoutDashboard,
    path: privateRoutePath.dashboard,
    title: 'sidebar.dashboard',
    bypass: true,
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
    icon: Ticket,
    path: privateRoutePath.dispatchBook.base,
    title: 'sidebar.dispatchBook',
  },
  {
    icon: Keyboard,
    path: privateRoutePath.recommendation.base,
    title: 'sidebar.recommendation',
  },
]
