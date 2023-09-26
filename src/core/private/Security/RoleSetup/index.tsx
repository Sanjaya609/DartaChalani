import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import RoleSetupWrapper from './components/RoleSetupWrapper'

const index = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('security.roleSetup.title')} />
      <RoleSetupWrapper />
    </FlexLayout>
  )
}

export default index
