import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { IServiceTypeInitialValue } from '../schema/servicetype.interface'
import {
  serviceTypeInitialValue,
  serviceTypeValidationSchema,
} from '../schema/servicetype.schema'
import { useCreateServiceType } from '../services/servicetype.query'

interface IServiceTypeProps {
  initialValues: IServiceTypeInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IServiceTypeInitialValue>
  >
}

const ServiceType = (props: IServiceTypeProps) => {
  const { initialValues, setInitialValues } = props
  const { mutate, isLoading } = useCreateServiceType()

  const { t } = useTranslation()

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: serviceTypeValidationSchema,
      onSubmit: (value) => {
        mutate(value, { onSuccess: () => resetFormValues() })
      },
    })

  const resetFormValues = () => setInitialValues(serviceTypeInitialValue)

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            isRequired
            value={values.nameEn}
            errors={errors}
            touched={touched}
            name="nameEn"
            label={t('masterSetup.serviceType.nameEn')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            isRequired
            isNepali
            value={values.nameNp}
            errors={errors}
            touched={touched}
            name="nameNp"
            label={t('masterSetup.serviceType.nameNp')}
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

export default ServiceType
