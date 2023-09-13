import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { fiscalYearInitialValue } from '../schema/fiscalyear.schema'
import FiscalYearForm from './FiscalYearForm'
import FiscalYearTable from './FiscalYearTable'

const FiscalYearWrapper = () => {
  const [initialValues, setInitialValues] = useState(fiscalYearInitialValue)
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <FiscalYearForm initialValues={initialValues} />
        <FiscalYearTable />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default FiscalYearWrapper
