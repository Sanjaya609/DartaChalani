import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import RoleSetupForm from './RoleSetupForm'
import RoleSetupTable from './RoleSetupTable'
import { roleSetupIntialValues } from '../schema/roleSetup.schema'
import useGetPrivilegeByPath from '@/hooks/useGetPrivilegeByPath'
import { routePaths } from '@/router'

const RoleSetupWrapper = () => {
  const [initialValues, setInitialValues] = useState(roleSetupIntialValues)
  const privilege = useGetPrivilegeByPath(routePaths.security.roleManagement)

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        {!!privilege?.CREATE && (
          <RoleSetupForm
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        )}
        <RoleSetupTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default RoleSetupWrapper
