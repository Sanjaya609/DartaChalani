import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { IOfficeInitialValue } from '../schema/office.interface'
import {
  officeInitialValue,
  officeValidationSchema,
} from '../schema/office.schema'
import { useCreateOffice } from '../services/office.query'

interface IOfficeFormProps {
  initialValues: IOfficeInitialValue
  setInitialValues: React.Dispatch<React.SetStateAction<IOfficeInitialValue>>
}

const OfficeForm = (props: IOfficeFormProps) => {
  const { initialValues, setInitialValues } = props
  const { mutate, isLoading } = useCreateOffice()

  const { t } = useTranslation()

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: officeValidationSchema,
    onSubmit: (value) => {
      mutate({ ...value }, { onSuccess: () => resetFormValues() })
    },
  })

  const resetFormValues = () => {
    resetForm()
    setInitialValues(officeInitialValue)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            value={values.officeNameEn}
            errors={errors}
            touched={touched}
            name="officeNameEn"
            label={t('masterSetup.office.officeNameEn')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            isNepali
            value={values.officeNameNP}
            errors={errors}
            touched={touched}
            name="officeNameNP"
            label={t('masterSetup.office.officeNameNP')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            value={values.addressEn}
            errors={errors}
            touched={touched}
            name="addressEn"
            label={t('masterSetup.office.addressEn')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            isNepali
            value={values.addressNp}
            errors={errors}
            touched={touched}
            name="addressNp"
            label={t('masterSetup.office.addressNp')}
            onChange={handleChange}
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
        <Button disabled={isLoading} loading={isLoading} className="ml-auto">
          {t('btns.save')}
        </Button>
      </Box>
    </form>
  )
}

export default OfficeForm
