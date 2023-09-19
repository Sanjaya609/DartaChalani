import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import EmailForm from './components/EmailForm'

const Email = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('security.email.title')} />
      <EmailForm />
    </FlexLayout>
  )
}

export default Email
