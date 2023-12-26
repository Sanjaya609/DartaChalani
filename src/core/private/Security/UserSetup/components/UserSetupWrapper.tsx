import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { userSetupInitialValue } from '../schema/user-setup.schema'
import UserSetupForm from './UserSetupForm'
import UserTable from './UserSetupTable'
import useGetPrivilegeByPath from '@/hooks/useGetPrivilegeByPath'
import { routePaths } from '@/router'

const UserSetupWrapper = () => {
  const [initialValues, setInitialValues] = useState(userSetupInitialValue)
  const privilege = useGetPrivilegeByPath(routePaths.security.userSetup)

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        {privilege?.CREATE && (
          <UserSetupForm
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        )}
        <UserTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default UserSetupWrapper
