import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'
import RoleModuleMappingWrapper from './components/RoleModuleMappingWrapper'

const index = () => {
    const { t } = useTranslation()
    return (
        <FlexLayout direction="column">
            <SectionHeader title={t('security.roleModuleMapping.title')} />
            <RoleModuleMappingWrapper />
        </FlexLayout>
    )
}

export default index
