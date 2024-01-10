import * as Yup from 'yup'

export const forgotPasswordInitialValue = {
  email: '',
}

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('yup.invalid-email')
    .required('public.login.errors.email'),
})
