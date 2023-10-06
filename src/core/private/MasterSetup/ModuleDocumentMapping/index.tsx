import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import ModuleDocumentMappingWrapper from './components/ModuleDocumentMappingWrapper'

const ModuleDocumentMapping = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('masterSetup.moduleDocumentMapping.title')} />
      <ModuleDocumentMappingWrapper />
    </FlexLayout>
  )
}

export default ModuleDocumentMapping
