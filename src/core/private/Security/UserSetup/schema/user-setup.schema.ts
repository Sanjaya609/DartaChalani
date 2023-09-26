import * as Yup from 'yup'
import { IUserSetupInitialValue } from './user-setup.interface'

export const userSetupInitialValue: IUserSetupInitialValue = {
  email: '',
  fullNameEn: '',
  fullNameNp: '',
  password: '',
  roleId: '',
  username: '',
  id: null,
}

export const userSetupValidationSchema = Yup.object({
  email: Yup.string()
    .required('security.userSetup.errors.email')
    .email('yup.invalid-email'),
  fullNameEn: Yup.string().required('security.userSetup.errors.fullNameEn'),
  fullNameNp: Yup.string().required('security.userSetup.errors.fullNameNp'),
  password: Yup.string().when('id', {
    is: (val: string) => !!val,
    then: () => Yup.string().nullable(),
    otherwise: () =>
      Yup.string().required('security.userSetup.errors.password'),
  }),
  roleId: Yup.string().required('security.userSetup.errors.roleId'),
  username: Yup.string().required('security.userSetup.errors.username'),
})
