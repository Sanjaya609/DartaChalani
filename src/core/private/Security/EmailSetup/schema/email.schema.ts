import * as Yup from 'yup'
import { IEmailInitialValue } from './email.interface'

export const emailInitialValue: IEmailInitialValue = {
  email: '',
  host: '',
  password: '',
  port: '',
  properties: [
    {
      key: '',
      value: '',
    },
  ],
}

export const emailValidationSchema = Yup.object({
  email: Yup.string()
    .required('security.email.errors.email')
    .email('yup.invalid-email'),
  host: Yup.string().required('security.email.errors.host'),
  password: Yup.string().required('security.email.errors.password'),
  port: Yup.string().required('security.email.errors.port'),
  properties: Yup.array()
    .of(
      Yup.object().shape({
        key: Yup.string().required('security.email.errors.key').nullable(),
        value: Yup.string().required('security.email.errors.value').nullable(),
      })
    )
    .min(1, 'security.email.errors.atLeastProperties')
    .uniqueProperty(
      'security.email.errors.duplicateKey',
      (a: { code: string }) => a.code
    ),
})
