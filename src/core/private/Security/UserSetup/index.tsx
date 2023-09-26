import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import UserSetupWrapper from './components/UserSetupWrapper'

const UserSetup = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('security.userSetup.title')} />
      <UserSetupWrapper />
    </FlexLayout>
  )
}

export default UserSetup
