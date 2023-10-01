import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { Text } from '@/components/ui/core/Text'
import { useState } from 'react'
import RoleModuleMapping from './RoleModuleMapping'


const RoleModuleMappingWrapper = () => {
    return (
        <ContainerLayout stretch className='p-0'>
            <FlexLayout direction="column">
                <RoleModuleMapping />
            </FlexLayout>
        </ContainerLayout>
    )
}

export default RoleModuleMappingWrapper
