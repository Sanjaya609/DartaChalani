import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import ModuleSetupForm from './ModuleSetupForm'
import ModuleSetupTable from './ModuleSetupTable'
import { moduleSetupInitialValues } from '../schema/moduleSetup.schema'

const ModuleSetupWrapper = () => {
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <ModuleSetupTable />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default ModuleSetupWrapper
