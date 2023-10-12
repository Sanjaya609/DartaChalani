import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { Outlet } from 'react-router-dom'

const DispatchBook = () => {
  return (
    <FlexLayout direction="column" className="relative">
      <Outlet />
    </FlexLayout>
  )
}

export default DispatchBook
