import MainHeader from '@/components/functional/MainHeader'
import BaseLayout from '@/components/ui/core/Layout/BaseLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import WrapperLayout from '@/components/ui/core/Layout/WrapperLayout'

import { Outlet } from 'react-router-dom'

function Boundary() {
  return (
    <>
      <WrapperLayout>
        <BaseLayout>
          <MainHeader />
          <FlexLayout direction="row">
            <Outlet />
          </FlexLayout>
        </BaseLayout>
      </WrapperLayout>
    </>
  )
}

export default Boundary
