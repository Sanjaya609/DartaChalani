import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { documentTypeInitialValue } from '../schema/document-type.schema'
import DocumentTypeForm from './DocumentTypeForm'
import DocumentTypeTable from './DocumentTypeTable'

const DocumentTypeWrapper = () => {
  const [initialValues, setInitialValues] = useState(documentTypeInitialValue)
  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <DocumentTypeForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        <DocumentTypeTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default DocumentTypeWrapper
