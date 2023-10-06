import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { documentTypeInitialValue } from '../schema/module-document-mapping.schema'
import ModuleDocumentMappingForm from './ModuleDocumentMappingForm'
import ModuleDocumentMappingTable from './ModuleDocumentMappingTable'

const ModuleDocumentMappingWrapper = () => {
  const [initialValues, setInitialValues] = useState(documentTypeInitialValue)
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <ModuleDocumentMappingForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        <ModuleDocumentMappingTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default ModuleDocumentMappingWrapper
