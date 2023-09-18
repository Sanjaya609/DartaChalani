import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import RoleSetupForm from './RoleSetupForm'
import RoleSetupTable from './RoleSetupTable'
import { roleSetupIntialValues } from '../schema/roleSetup.schema'


const RoleSetupWrapper = () => {
    const [initialValues, setInitialValues] = useState(roleSetupIntialValues)
    return (
        <ContainerLayout stretch>
            <FlexLayout direction="column">
                <RoleSetupForm initialValues={initialValues} setInitialValues={setInitialValues} />
                <RoleSetupTable initialValues={initialValues} setInitialValues={setInitialValues} />
            </FlexLayout>
        </ContainerLayout>
    )
}

export default RoleSetupWrapper
