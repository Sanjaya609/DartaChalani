import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import {
  roleSetupIntialValues,
  roleSetupValidationSchema,
} from '../schema/roleSetup.schema'
import { useCreateRole } from '../services/roleSetup.query'
import { Toast } from 'react-toastify/dist/components'
import { RoleSetupFormSchema } from '../schema/roleSetup.interface'
import { useTranslation } from 'react-i18next'
import { APIENUM } from '@/utility/enums/api.enum'
import { useGetEnumDataWithName } from '@/service/generic/generic.query'

interface IRoleSetupFormProps {
  initialValues: RoleSetupFormSchema
  setInitialValues: React.Dispatch<React.SetStateAction<RoleSetupFormSchema>>
}
const RoleSetupForm = ({
  initialValues,
  setInitialValues,
}: IRoleSetupFormProps) => {
  const { t } = useTranslation()
  const { mutateAsync: createRole, isLoading } = useCreateRole()
  const { data: roleTypeData = [] } = useGetEnumDataWithName<OptionType[]>(
    APIENUM.USER_TYPE,
    {
      mapDatatoStyleSelect: true,
    }
  )

  const {
    values,
    handleSubmit,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: roleSetupValidationSchema,
    onSubmit: (values, { resetForm }) => {
      createRole(values, {
        onSuccess: (res) => {
          resetForm()
          setInitialValues(roleSetupIntialValues)
        },
      })
    },
  })
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            value={values.roleNameEnglish}
            errors={errors}
            touched={touched}
            name="roleNameEnglish"
            label={t('security.roleSetup.roleNameEnglish')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            isNepali
            value={values.roleNameNepali}
            errors={errors}
            touched={touched}
            name="roleNameNepali"
            label={t('security.roleSetup.roleNameNepali')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Select
            options={roleTypeData}
            calculateValueOnChange
            value={values.roleType}
            errors={errors}
            touched={touched}
            name="roleType"
            label={t('security.roleSetup.roleType')}
            onChange={(event) => {
              setFieldValue(event.name, event.main)
            }}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.TextArea
            value={values.description}
            errors={errors}
            touched={touched}
            name="description"
            label={t('security.roleSetup.description')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
      </Grid>
      <Box className="mt-4 text-right">
        <Button
          disabled={isLoading}
          type="button"
          onClick={() => {
            setInitialValues(roleSetupIntialValues)
            resetForm()
          }}
          btnType="outlined"
          variant="secondary"
          className="mr-3"
        >
          {t('btns.cancel')}
        </Button>
        <Button type="submit" className="ml-auto">
          {t('btns.save')}
        </Button>
      </Box>
    </form>
  )
}

export default RoleSetupForm
