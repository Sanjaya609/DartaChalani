import Form from '@/components/functional/Form/Form'
import PasswordInput from '@/components/functional/PasswordInput'
import { Box, Button, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useGetAllActiveRole } from '../../RoleSetup/services/roleSetup.query'
import { IUserSetupInitialValue } from '../schema/user-setup.interface'
import {
  userSetupInitialValue,
  userSetupValidationSchema,
} from '../schema/user-setup.schema'
import { useCreateUser } from '../services/user-setup.query'

interface IUserSetupFormProps {
  initialValues: IUserSetupInitialValue
  setInitialValues: React.Dispatch<React.SetStateAction<IUserSetupInitialValue>>
}

const UserSetupForm = (props: IUserSetupFormProps) => {
  const { initialValues, setInitialValues } = props
  const { mutate, isLoading } = useCreateUser()

  const { t } = useTranslation()

  const { data: roleData = [], isFetching: roleDataFetching } =
    useGetAllActiveRole<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: userSetupValidationSchema,
    onSubmit: (values) => {
      const editPayload = {
        id: values.id,
        email: values.email,
        fullNameEn: values.fullNameEn,
        fullNameNp: values.fullNameNp,
        username: values.username,
        roleId: values.roleId,
      }
      mutate(values?.id ? editPayload : values, {
        onSuccess: () => resetFormValues(),
      })
    },
  })

  const resetFormValues = () => {
    resetForm()
    setInitialValues(userSetupInitialValue)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            isRequired
            value={values.fullNameEn}
            errors={errors}
            touched={touched}
            name="fullNameEn"
            label={t('security.userSetup.fullNameEn')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            isRequired
            isNepali
            value={values.fullNameNp}
            errors={errors}
            touched={touched}
            name="fullNameNp"
            label={t('security.userSetup.fullNameNp')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>{' '}
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            onChange={(e) => {
              setFieldValue('email', e.target.value.replace(/\s/g, ''))
            }}
            isRequired
            autoComplete="new-email"
            value={values.email}
            errors={errors}
            touched={touched}
            name="email"
            label={t('security.userSetup.email')}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            isRequired
            value={values.username}
            errors={errors}
            touched={touched}
            name="username"
            label={t('security.userSetup.username')}
            onChange={(e) => {
              setFieldValue('username', e.target.value.replace(/\s/g, ''))
            }}
            onBlur={handleBlur}
          />
        </Grid.Col>
        {!values?.id && (
          <Grid.Col sm={'sm:col-span-3'}>
            <PasswordInput
              isRequired
              autoComplete="new-password"
              value={values.password}
              errors={errors}
              touched={touched}
              id="password"
              label={t('security.userSetup.password')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid.Col>
        )}
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Select
            isRequired
            isLoading={roleDataFetching}
            calculateValueOnChange
            value={values.roleId}
            errors={errors}
            touched={touched}
            options={roleData}
            name="roleId"
            label={t('security.userSetup.roleId')}
            onChange={(e) => {
              setFieldValue('roleId', e.main)
            }}
            onBlur={handleBlur}
          />
        </Grid.Col>
      </Grid>

      <Box className="mt-4 text-right">
        {initialValues?.id && (
          <Button
            disabled={isLoading}
            type="button"
            onClick={resetFormValues}
            btnType="outlined"
            variant="secondary"
            className="mr-3"
          >
            {t('btns.cancel')}
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          className="ml-auto"
        >
          {t('btns.save')}
        </Button>
      </Box>
    </form>
  )
}

export default UserSetupForm
