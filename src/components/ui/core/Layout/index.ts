import MainLayout from '@/components/ui/core/Layout/MainLayout'
import AbsoluteLayout from '@/components/ui/core/Layout/AbsoluteLayout'
import WrapperLayout from '@/components/ui/core/Layout/WrapperLayout'
import BaseLayout from '@/components/ui/core/Layout/BaseLayout'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'

const Layout = {
  Absolute: AbsoluteLayout,
  Base: BaseLayout,
  Container: ContainerLayout,
  Flex: FlexLayout,
  Main: MainLayout,
  Wrapper: WrapperLayout,
}

export { Layout }
