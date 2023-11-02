import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import RoleModuleMappingWrapper from './components/RoleModuleMappingWrapper'
import useGetRoleMappingParamsData from './components/useGetRoleMappingParamsData'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate } from '@/router'

const index = () => {
  const { t } = useTranslation()
  const roleData = useGetRoleMappingParamsData()
  const navigate = useNavigate()

  return (
    <FlexLayout direction="column">
      <SectionHeader
        className="px-4"
        title={`${t('security.roleModuleMapping.title')} (${getTextByLanguage(
          roleData?.roleNameEnglish || '',
          roleData?.roleNameNepali || ''
        )})`}
        backAction={() => {
          navigate(privateRoutePath.security.roleManagement)
        }}
      />
      <RoleModuleMappingWrapper />
    </FlexLayout>
  )
}

export default index
