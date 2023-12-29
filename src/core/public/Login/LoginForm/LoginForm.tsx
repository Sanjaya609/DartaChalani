import Form from '@/components/functional/Form/Form'
import PasswordInput from '@/components/functional/PasswordInput'
import { Button } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  loginInitialValue,
  loginValidationSchema,
} from '../schema/login.schema'
import { useLogin } from '../services/login.query'
import { Dispatch, SetStateAction } from 'react'

interface ILoginFormProps {
  setShowPasswordResetForm: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({ setShowPasswordResetForm }: ILoginFormProps) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useLogin()

  const {
    values,
    handleSubmit,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: loginInitialValue,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  })

  return (
    <Card className="rounded-r-lg px-8 py-7">
      <Text variant="h6" typeface="extrabold" className="mb-4">
        {t('public.login.login')}
      </Text>

      <form onSubmit={handleSubmit}>
        <Form.Input
          label={t('public.login.username')}
          wrapperClassName="mb-4"
          value={values.username}
          errors={errors}
          touched={touched}
          name="username"
          onChange={(e) => {
            setFieldValue('username', e.target.value.replace(/\s/g, ''))
          }}
          onBlur={handleBlur}
        />
        <PasswordInput
          autoComplete="new-password"
          value={values.password}
          errors={errors}
          touched={touched}
          id="password"
          label={t('public.login.password')}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Button loading={isLoading} className="w-full">
          {t('btns.login')}
        </Button>
      </form>
    </Card>
  )
}

export default LoginForm
