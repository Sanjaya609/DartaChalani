import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import SectorWrapper from './components/SectorWrapper'

const Sector = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('masterSetup.sector.title')} />
      <SectorWrapper />
    </FlexLayout>
  )
}

export default Sector
