import { Grid } from '@/components/ui'
import { useState } from 'react'
import { IModuleSetupTableData } from '../../ModuleSetup/schema/moduleSetup.interface'
import RoleModuleAssignedList from './RoleModuleAssignedList'
import RoleModuleResourceList from './RoleModuleResourceList'

const RoleModuleMapping = () => {
  const [selectedModule, setSelectedModule] = useState<IModuleSetupTableData>()

  return (
    <Grid sm={'sm:grid-cols-12'} className="h-full w-full">
      <RoleModuleAssignedList
        setSelectedModule={setSelectedModule}
        selectedModule={selectedModule}
      />
      <RoleModuleResourceList selectedModule={selectedModule} />
    </Grid>
  )
}

export default RoleModuleMapping
