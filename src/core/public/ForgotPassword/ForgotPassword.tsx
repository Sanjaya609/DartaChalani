import Form from '@/components/functional/Form/Form'
import PasswordInput from '@/components/functional/PasswordInput'
import { Button, Flexbox } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { publicRoutePath, useNavigate, useParams } from '@/router'
import {
  useForgotPassword,
  useSendResetPasswordLink,
} from '@/service/oauth/oauth.query'
import { useFormik } from 'formik'
import { ArrowLeft } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import PublicPageWrapper from '../PublicPageWrapper/PublicPageWrapper'
import {
  forgotPasswordInitialValue,
  forgotPasswordValidationSchema,
} from './schema/forgot-password.schema'

const ResetPassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const { mutate: sendResetPasswordLink, isLoading: resetPasswordLoading } =
    useSendResetPasswordLink()

  const goToLogin = () => {
    navigate(publicRoutePath.login)
  }

  const { values, handleSubmit, errors, touched, setFieldValue, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: forgotPasswordInitialValue,
      validationSchema: forgotPasswordValidationSchema,
      onSubmit: (values) => {
        sendResetPasswordLink(values, {
          onSuccess: () => {
            goToLogin()
          },
        })
      },
    })

  return (
    <PublicPageWrapper>
      <Card className="w-[400px] rounded-r-lg px-8 py-7">
        <Flexbox align="center" justify="space-between" className="mb-4">
          <Text variant="h6" typeface="extrabold">
            {t('public.login.forgotPassword')}
          </Text>

          <Button
            size="sm"
            className="flex items-center"
            variant="secondary"
            btnType="ghost"
            onClick={goToLogin}
          >
            <ArrowLeft size={16} className="mr-2" /> {t('btns.login')}
          </Button>
        </Flexbox>

        <form onSubmit={handleSubmit}>
          <Form.Input
            wrapperClassName="mb-4"
            isRequired
            autoComplete="email"
            value={values.email}
            errors={errors}
            touched={touched}
            id="email"
            label={t('public.login.resetPassword.email')}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue('email', e.target.value.replace(/\s/g, ''))
            }}
          />

          <Button
            disabled={resetPasswordLoading}
            loading={resetPasswordLoading}
            className="w-full"
          >
            {t('public.login.sendResetPasswordLink')}
          </Button>
        </form>
      </Card>
    </PublicPageWrapper>
  )
}

export default ResetPassword
