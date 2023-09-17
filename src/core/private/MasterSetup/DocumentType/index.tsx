import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import DocumentTypeWrapper from './components/DocumentTypeWrapper'

const DocumentType = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('masterSetup.documentType.title')} />
      <DocumentTypeWrapper />
    </FlexLayout>
  )
}

export default DocumentType
