import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { serviceTypeInitialValue } from '../schema/servicetype.schema'
import ServiceTypeForm from './ServiceTypeForm'
import ServiceTypeTable from './ServiceTypeTable'

const ServiceTypeWrapper = () => {
  const [initialValues, setInitialValues] = useState(serviceTypeInitialValue)
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <ServiceTypeForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        <ServiceTypeTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default ServiceTypeWrapper
