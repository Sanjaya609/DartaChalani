import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { Outlet } from 'react-router-dom'

const DropdownConfig = () => {
  return (
    <FlexLayout direction="column" className="relative">
      <Outlet />
    </FlexLayout>
  )
}

export default DropdownConfig
