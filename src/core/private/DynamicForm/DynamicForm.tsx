import Sidebar from '@/components/functional/MainSidebar/Sidebar/Sidebar'
import { ISidebarItem } from '@/components/functional/MainSidebar/Sidebar/sidebar.interface'
import { Layout } from '@/components/ui'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'

const DynamicForm = (props: Partial<IRoutePrivilege>) => {
  const { currentModuleDetails } = props

  const sideBarItem = useMemo(
    () =>
      (currentModuleDetails?.dynamicField
        ? currentModuleDetails?.parentMenuData?.childModuleList
        : currentModuleDetails?.childModuleList
      )?.map((child) => ({
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
        currentPath={
          currentModuleDetails?.dynamicField
            ? currentModuleDetails?.parentMenuData?.url
            : currentModuleDetails?.url
        }
      />
      <Outlet />
    </Layout.Flex>
  )
}

export default DynamicForm
