import Sidebar from '@/components/functional/MainSidebar/Sidebar/Sidebar'
import { ISidebarItem } from '@/components/functional/MainSidebar/Sidebar/sidebar.interface'
import { Layout } from '@/components/ui'
import { privateRoutePath } from '@/router'
import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'

const MasterSetup = () => {
  const sideBarItem = useMemo<ISidebarItem[]>(
    () => [
      {
        title: 'Fiscal Year',
        path: privateRoutePath.masterSetup.fiscalYear,
      },
    ],
    []
  )

  return (
    <Layout.Flex>
      <Sidebar sideBarItem={sideBarItem} />
      <Outlet />
    </Layout.Flex>
  )
}

export default MasterSetup
