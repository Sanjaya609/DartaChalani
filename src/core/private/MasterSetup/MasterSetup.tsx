import Sidebar from '@/components/functional/MainSidebar/Sidebar/Sidebar'
import { ISidebarItem } from '@/components/functional/MainSidebar/Sidebar/sidebar.interface'
import { Layout } from '@/components/ui'
import { privateRoutePath } from '@/router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

const MasterSetup = () => {
  const { t } = useTranslation()
  const sideBarItem = useMemo<ISidebarItem[]>(
    () => [
      {
        title: t('sidebar.masterSetup.fiscalYear'),
        path: privateRoutePath.masterSetup.fiscalYear,
      },
      {
        title: t('sidebar.masterSetup.office'),
        path: privateRoutePath.masterSetup.office,
      },
      {
        title: t('sidebar.masterSetup.sector'),
        path: privateRoutePath.masterSetup.sector,
      },
      {
        title: t('sidebar.masterSetup.serviceType'),
        path: privateRoutePath.masterSetup.serviceType,
      },
      {
        title: t('sidebar.masterSetup.documentType'),
        path: privateRoutePath.masterSetup.documentType,
      },
      {
        title: t('sidebar.masterSetup.moduleDocumentMapping'),
        path: privateRoutePath.masterSetup.moduleDocumentMapping,
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

export default MasterSetup
