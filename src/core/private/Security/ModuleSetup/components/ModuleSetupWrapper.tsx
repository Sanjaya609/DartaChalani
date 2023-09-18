import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import ModuleSetupForm from './ModuleSetupForm'
import ModuleSetupTable from './ModuleSetupTable'
import { moduleSetupInitialValues } from '../schema/moduleSetup.schema'


const ModuleSetupWrapper = () => {
    const [initialValues, setInitialValues] = useState(moduleSetupInitialValues)
    return (
        <ContainerLayout stretch>
            <FlexLayout direction="column">
                <ModuleSetupForm initialValues={initialValues} setInitialValues={setInitialValues} />
                <ModuleSetupTable initialValues={initialValues} setInitialValues={setInitialValues} />
            </FlexLayout>
        </ContainerLayout>
    )
}

export default ModuleSetupWrapper
