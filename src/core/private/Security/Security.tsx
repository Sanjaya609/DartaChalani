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
                title: 'Role Setup',
                path: privateRoutePath.security.roleSetup,
            },
            {
                title: 'Module Setup',
                path: privateRoutePath.security.moduleSetup,
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
