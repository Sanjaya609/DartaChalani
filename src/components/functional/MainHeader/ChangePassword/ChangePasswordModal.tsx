import Modal from '@/components/ui/Modal/Modal'
import { t } from 'i18next'
import PasswordInput from '../../PasswordInput'
import { Grid } from '@/components/ui'
import { useFormik } from 'formik'
import {
  changePasswordInitialValue,
  changePasswordValidationSchema,
} from './schema/change-password.schema'
import { useChangePassword } from '@/service/oauth/oauth.query'
import { useAuth } from '@/providers'
import TokenService from '@/service/token/token.service'

interface IChangePasswordModalProps {
  openModal: boolean
  toggleModal: VoidFunction
}

const ChangePasswordModal = (props: IChangePasswordModalProps) => {
  const { openModal, toggleModal } = props
  const { mutate: changePassword, isLoading: changePasswordLoading } =
    useChangePassword()
  const { setIsAuthenticated } = useAuth()

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: changePasswordInitialValue,
      enableReinitialize: true,
      validationSchema: changePasswordValidationSchema,
      onSubmit: (values) => {
        changePassword(values, {
          onSuccess: () => {
            setIsAuthenticated(false)
            TokenService.clearToken()
          },
        })
      },
    })

  return (
    <Modal
      open={openModal}
      toggleModal={toggleModal}
      title={t('changePasswordLabel')}
      saveBtnProps={{
        btnTitle: t('changePasswordLabel'),
        btnAction: handleSubmit,
        loading: changePasswordLoading,
        disabled: changePasswordLoading,
      }}
      cancelBtnProps={{
        disabled: changePasswordLoading,
      }}
    >
      <form>
        <Grid sm={'sm:grid-cols-12'} gap="gap-4">
          <Grid.Col sm={'sm:col-span-12'}>
            <PasswordInput
              isRequired
              autoComplete="new-password"
              value={values.currentPassword}
              errors={errors}
              touched={touched}
              id="currentPassword"
              label={t('form.currentPassword')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid.Col>
          <Grid.Col sm={'sm:col-span-12'}>
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
          </Grid.Col>
          <Grid.Col sm={'sm:col-span-12'}>
            <PasswordInput
              isRequired
              autoComplete="new-password"
              value={values.confirmNewPassword}
              errors={errors}
              touched={touched}
              id="confirmNewPassword"
              label={t('form.confirmNewPassword')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  )
}

export default ChangePasswordModal
