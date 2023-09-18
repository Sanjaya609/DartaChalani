import SectionHeader from '@/components/functional/SectionHeader'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import React from 'react'
import RoleSetupForm from './components/RoleSetupForm'
import RoleSetupTable from './components/RoleSetupTable'
import RoleSetupWrapper from './components/RoleSetupWrapper'

const index = () => {
    return (
        <FlexLayout direction='column'>
            <SectionHeader title="RoleSetup" />
            <RoleSetupWrapper />
        </FlexLayout>
    )
}

export default index