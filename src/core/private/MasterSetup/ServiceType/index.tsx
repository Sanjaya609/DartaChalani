import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import ServiceTypeWrapper from './components/ServiceTypeWrapper'

const ServiceType = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('masterSetup.serviceType.title')} />
      <ServiceTypeWrapper />
    </FlexLayout>
  )
}

export default ServiceType

5449637 / 47
