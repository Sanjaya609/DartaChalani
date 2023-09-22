import * as Yup from 'yup'
import { IDocumentTypeInitialValue } from './document-type.interface'

export const documentTypeInitialValue: IDocumentTypeInitialValue = {
  allowedFileTypes: [],
  documentTypeEn: '',
  documentTypeNp: '',
  isMandatory: true,
  maxFileSize: '',
  moduleId: '',
}

export const documentTypeValidationSchema = Yup.object({
  maxFileSize: Yup.string().required(
    'masterSetup.documentType.errors.maxFileSize'
  ),
  documentTypeEn: Yup.string().required(
    'masterSetup.documentType.errors.documentTypeEn'
  ),
  documentTypeNp: Yup.string().required(
    'masterSetup.documentType.errors.documentTypeNp'
  ),
  moduleId: Yup.string().required('masterSetup.documentType.errors.moduleName'),
  allowedFileTypes: Yup.array()
    .min(1, 'masterSetup.documentType.errors.allowedFileTypes')
    .nullable()
    .required('masterSetup.documentType.errors.allowedFileTypes'),
})
