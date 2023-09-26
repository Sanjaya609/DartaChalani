import Sidebar from '@/components/functional/MainSidebar/Sidebar/Sidebar'
import { ISidebarItem } from '@/components/functional/MainSidebar/Sidebar/sidebar.interface'
import { Layout } from '@/components/ui'
import { privateRoutePath } from '@/router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

const Security = () => {
  const { t } = useTranslation()
  const sideBarItem = useMemo<ISidebarItem[]>(
    () => [
      {
        title: t('sidebar.security.role'),
        path: privateRoutePath.security.roleSetup,
      },
      {
        title: t('sidebar.security.user'),
        path: privateRoutePath.security.userSetup,
      },
      {
        title: t('sidebar.security.module'),
        path: privateRoutePath.security.moduleSetup,
      },
      {
        title: t('sidebar.security.email'),
        path: privateRoutePath.security.emailSetup,
      },
    ],
    [t]
  )

  return (
    <Layout.Flex>
      <Sidebar sideBarItem={sideBarItem} />
      <Outlet />
    </Layout.Flex>
  )
}

export default Security
