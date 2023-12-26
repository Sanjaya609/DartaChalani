import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useState } from 'react'
import { documentTypeInitialValue } from '../schema/module-document-mapping.schema'
import ModuleDocumentMappingForm from './ModuleDocumentMappingForm'
import ModuleDocumentMappingTable from './ModuleDocumentMappingTable'
import useGetPrivilegeByPath from '@/hooks/useGetPrivilegeByPath'
import { routePaths } from '@/router'

const ModuleDocumentMappingWrapper = () => {
  const [initialValues, setInitialValues] = useState(documentTypeInitialValue)
  const privilege = useGetPrivilegeByPath(
    routePaths.masterSetup.moduleDocumentMapping
  )

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        {privilege?.CREATE && (
          <ModuleDocumentMappingForm
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        )}
        <ModuleDocumentMappingTable
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </FlexLayout>
    </ContainerLayout>
  )
}

export default ModuleDocumentMappingWrapper
