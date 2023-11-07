import * as Yup from 'yup'
import { ILoginPayload } from './login.interface'

export const loginInitialValue: ILoginPayload = {
  username: '',
  password: '',
  grant_type: 'password',
}

export const loginValidationSchema = Yup.object({
  username: Yup.string().required('public.login.errors.username'),
  password: Yup.string().required('public.login.errors.password'),
})
