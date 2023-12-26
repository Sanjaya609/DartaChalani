import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { officeInitialValue } from '../schema/office.schema'
import OfficeForm from './OfficeForm'
import OfficeTable from './OfficeTable'
import useGetPrivilegeByPath from '@/hooks/useGetPrivilegeByPath'
import { routePaths } from '@/router'

const OfficeWrapper = () => {
  const [initialValues, setInitialValues] = useState(officeInitialValue)
  const privilege = useGetPrivilegeByPath(routePaths.masterSetup.office)

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        {!!privilege?.CREATE && (
          <OfficeForm
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        )}
        <OfficeTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default OfficeWrapper
