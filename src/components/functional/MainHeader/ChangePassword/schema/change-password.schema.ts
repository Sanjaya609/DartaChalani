import { IChangePassword } from '@/service/oauth/oauth.interface'
import { passwordRegex } from '@/utility/regex'
import * as Yup from 'yup'

export const changePasswordInitialValue: IChangePassword = {
  confirmNewPassword: '',
  currentPassword: '',
  newPassword: '',
}

export const changePasswordValidationSchema = Yup.object({
  confirmNewPassword: Yup.string()
    .required('form.confirmNewPassword-required')
    .oneOf([Yup.ref('newPassword')], 'form.passwordDoesNotMatch'),
  currentPassword: Yup.string().required('form.currentPassword-required'),
  newPassword: Yup.string()
    .required('form.newPassword-required')
    .matches(passwordRegex, 'enter strong password')
    .notOneOf([Yup.ref('currentPassword')], 'form.newAndOldSame'),
})
