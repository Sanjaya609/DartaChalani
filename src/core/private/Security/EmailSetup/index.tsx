import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { useTranslation } from 'react-i18next'
import EmailForm from './components/EmailForm'

const Email = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
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
            : t('security.email.title')
        }
      />
      <EmailForm />
    </FlexLayout>
  )
}

export default Email
