import Sidebar from '@/components/functional/MainSidebar/Sidebar/Sidebar'
import { Layout } from '@/components/ui'
import { Outlet } from 'react-router-dom'

const MasterSetup = () => {
  return (
    <Layout.Flex>
      <Sidebar />

      <Outlet />
    </Layout.Flex>
  )
}

export default MasterSetup
