import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import ModuleSetupWrapper from './components/ModuleSetupWrapper'

const index = () => {
    return (
        <FlexLayout direction='column'>
            <SectionHeader title="Module Setup" />
            <ModuleSetupWrapper />
        </FlexLayout>
    )
}

export default index