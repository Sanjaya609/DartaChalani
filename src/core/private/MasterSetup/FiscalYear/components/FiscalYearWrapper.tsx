import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { fiscalYearInitialValue } from '../schema/fiscalyear.schema'
import FiscalYearForm from './FiscalYearForm'
import FiscalYearTable from './FiscalYearTable'
import useGetPrivilegeByPath from '@/hooks/useGetPrivilegeByPath'
import { routePaths } from '@/router'

const FiscalYearWrapper = () => {
  const [initialValues, setInitialValues] = useState(fiscalYearInitialValue)
  const privilege = useGetPrivilegeByPath(routePaths.masterSetup.fiscalYear)

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        {privilege?.CREATE && (
          <FiscalYearForm
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        )}
        <FiscalYearTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default FiscalYearWrapper
