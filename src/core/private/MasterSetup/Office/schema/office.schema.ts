import * as Yup from 'yup'
import { IOfficeInitialValue } from './office.interface'

export const officeInitialValue: IOfficeInitialValue = {
  addressEn: '',
  addressNp: '',
  isActive: true,
  officeNameEn: '',
  officeNameNP: '',
}

export const officeValidationSchema = Yup.object({
  officeNameEn: Yup.string().required('masterSetup.office.errors.officeNameEn'),
  officeNameNP: Yup.string().required('masterSetup.office.errors.officeNameNP'),
  addressNp: Yup.string().required('masterSetup.office.errors.addressNp'),
  addressEn: Yup.string().required('masterSetup.office.errors.addressEn'),
})
