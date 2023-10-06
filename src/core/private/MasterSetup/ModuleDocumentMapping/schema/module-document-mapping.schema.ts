import * as Yup from 'yup'
import { IModuleDocumentMappingInitialValue } from './module-document-mapping.interface'

export const documentTypeInitialValue: IModuleDocumentMappingInitialValue = {
  documentTypeId: '',
  isMandatory: true,
  moduleId: '',
}

export const documentTypeValidationSchema = Yup.object({
  documentTypeId: Yup.string().required(
    'masterSetup.documentType.errors.documentTypeEn'
  ),
  moduleId: Yup.string().required('masterSetup.documentType.errors.moduleName'),
})
