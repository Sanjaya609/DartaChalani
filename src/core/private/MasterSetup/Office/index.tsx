import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import OfficeWrapper from './components/OfficeWrapper'

const Office = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('masterSetup.office.title')} />
      <OfficeWrapper />
    </FlexLayout>
  )
}

export default Office
