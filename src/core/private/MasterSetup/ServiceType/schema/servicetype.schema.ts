import * as Yup from 'yup'
import { IServiceTypeInitialValue } from './servicetype.interface'

export const serviceTypeInitialValue: IServiceTypeInitialValue = {
  nameNp: '',
  nameEn: '',
}

export const serviceTypeValidationSchema = Yup.object({
  nameEn: Yup.string().required('masterSetup.serviceType.errors.nameEn'),
  nameNp: Yup.string().required('masterSetup.serviceType.errors.nameNp'),
})
