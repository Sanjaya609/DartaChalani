import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import FiscalYearWrapper from './components/FiscalYearWrapper'

const FiscalYear = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('masterSetup.fiscalYear.title')} />
      <FiscalYearWrapper />
    </FlexLayout>
  )
}

export default FiscalYear
