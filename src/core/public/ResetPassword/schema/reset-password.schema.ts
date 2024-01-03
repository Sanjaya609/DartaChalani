import * as Yup from 'yup'

export const resetPasswordInitialValue = {
  confirmPassword: '',
  newPassword: '',
}

export const resetPasswordValidationSchema = Yup.object({
  newPassword: Yup.string().required('form.newPassword-required'),
  confirmPassword: Yup.string()
    .required('form.confirmNewPassword-required')
    .oneOf([Yup.ref('newPassword')], 'form.passwordDoesNotMatch'),
})
