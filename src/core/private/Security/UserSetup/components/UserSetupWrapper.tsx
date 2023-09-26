import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { userSetupInitialValue } from '../schema/user-setup.schema'
import UserSetupForm from './UserSetupForm'
import UserTable from './UserSetupTable'

const UserSetupWrapper = () => {
  const [initialValues, setInitialValues] = useState(userSetupInitialValue)
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <UserSetupForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        <UserTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default UserSetupWrapper
