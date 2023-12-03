import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { useTranslation } from 'react-i18next'
import DocumentTypeWrapper from './components/DocumentTypeWrapper'

const DocumentType = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader
        title={
          currentModuleDetails
            ? getTextByLanguage(
                currentModuleDetails.moduleNameEnglish,
                currentModuleDetails.moduleNameNepali
              )
            : t('masterSetup.documentType.title')
        }
      />
      <DocumentTypeWrapper />
    </FlexLayout>
  )
}

export default DocumentType
