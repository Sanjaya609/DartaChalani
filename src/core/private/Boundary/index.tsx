import MainHeader from '@/components/functional/MainHeader'
import MainSidebar from '@/components/functional/MainSidebar'
import BaseLayout from '@/components/ui/core/Layout/BaseLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import MainLayout from '@/components/ui/core/Layout/MainLayout'
import WrapperLayout from '@/components/ui/core/Layout/WrapperLayout'
import { SidebarProvider } from '@/providers/SidebarProvider'
import { Outlet } from 'react-router-dom'

function Boundary() {
  return (
    <SidebarProvider>
      <WrapperLayout className="bg-gray-96">
        <BaseLayout>
          <MainHeader />
          <FlexLayout direction="row">
            <MainSidebar />
            <MainLayout>
              <Outlet />
            </MainLayout>
          </FlexLayout>
        </BaseLayout>
      </WrapperLayout>
    </SidebarProvider>
  )
}

export default Boundary
