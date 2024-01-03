import PasswordInput from '@/components/functional/PasswordInput'
import { Button, Flexbox } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { publicRoutePath, useNavigate, useParams } from '@/router'
import { useForgotPassword } from '@/service/oauth/oauth.query'
import { useFormik } from 'formik'
import { ArrowLeft } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import PublicPageWrapper from '../PublicPageWrapper/PublicPageWrapper'
import {
  resetPasswordInitialValue,
  resetPasswordValidationSchema,
} from './schema/reset-password.schema'

const ResetPassword = () => {
  const { t } = useTranslation()
  const { mutate: resetPassword, isLoading } = useForgotPassword()
  const navigate = useNavigate()
  const params = useParams()

  const goToLogin = () => {
    navigate(publicRoutePath.login)
  }

  const { values, handleSubmit, errors, touched, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: resetPasswordInitialValue,
      validationSchema: resetPasswordValidationSchema,
      onSubmit: (values) => {
        if (params?.token) {
          resetPassword(
            { ...values, token: params?.token },
            {
              onSuccess: () => {
                goToLogin()
              },
            }
          )
        }
      },
    })

  return (
    <PublicPageWrapper>
      <Card className="w-[400px] rounded-r-lg px-8 py-7">
        <Flexbox align="center" justify="space-between">
          <Text variant="h6" typeface="extrabold" className="mb-4">
            {t('public.login.resetPassword.header')}
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
          <PasswordInput
            isRequired
            autoComplete="new-password"
            value={values.newPassword}
            errors={errors}
            touched={touched}
            id="newPassword"
            label={t('form.newPassword')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <PasswordInput
            isRequired
            autoComplete="new-password"
            value={values.confirmPassword}
            errors={errors}
            touched={touched}
            id="confirmPassword"
            label={t('form.confirmNewPassword')}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button loading={isLoading} className="w-full">
            {t('public.login.resetPassword.btnTitle')}
          </Button>
        </form>
      </Card>
    </PublicPageWrapper>
  )
}

export default ResetPassword
