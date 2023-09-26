import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { officeInitialValue } from '../schema/office.schema'
import OfficeForm from './OfficeForm'
import OfficeTable from './OfficeTable'

const OfficeWrapper = () => {
  const [initialValues, setInitialValues] = useState(officeInitialValue)
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <OfficeForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        <OfficeTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default OfficeWrapper
