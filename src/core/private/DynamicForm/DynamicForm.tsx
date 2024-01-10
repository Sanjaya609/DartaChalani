import Sidebar from '@/components/functional/MainSidebar/Sidebar/Sidebar'
import { ISidebarItem } from '@/components/functional/MainSidebar/Sidebar/sidebar.interface'
import { Layout } from '@/components/ui'
import { privateRoutePath } from '@/router'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'

const DynamicForm = (props: Partial<IRoutePrivilege>) => {
  const { currentModuleDetails } = props
  console.log({ currentModuleDetails })

  const sideBarItem = useMemo(
    () =>
      currentModuleDetails?.childModuleList?.map((child) => ({
        title: child.moduleNameNepali,
        path: child.url,
        titleEn: child.moduleNameEnglish,
        titleNp: child.moduleNameNepali,
      })) || [],
    []
  )

  return (
    <Layout.Flex>
      <Sidebar
        sideBarItem={sideBarItem as ISidebarItem[]}
        currentPath={currentModuleDetails?.url}
      />
      <Outlet />
    </Layout.Flex>
  )
}

export default DynamicForm
