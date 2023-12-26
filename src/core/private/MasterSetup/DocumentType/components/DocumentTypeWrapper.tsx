import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { documentTypeInitialValue } from '../schema/document-type.schema'
import DocumentTypeForm from './DocumentTypeForm'
import DocumentTypeTable from './DocumentTypeTable'
import useGetPrivilegeByPath from '@/hooks/useGetPrivilegeByPath'
import { routePaths } from '@/router'

const DocumentTypeWrapper = () => {
  const [initialValues, setInitialValues] = useState(documentTypeInitialValue)
  const privilege = useGetPrivilegeByPath(routePaths.masterSetup.documentType)

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        {privilege?.CREATE && (
          <DocumentTypeForm
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        )}
        <DocumentTypeTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default DocumentTypeWrapper
