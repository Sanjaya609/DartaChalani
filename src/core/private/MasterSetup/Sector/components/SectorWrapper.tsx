import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { sectorInitialValue } from '../schema/sector.schema'
import SectorForm from './SectorForm'
import SectorTable from './SectorTable'

const SectorWrapper = () => {
  const [initialValues, setInitialValues] = useState(sectorInitialValue)
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <SectorForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        <SectorTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default SectorWrapper
