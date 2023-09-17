import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import { inputChangeNumberOnly } from '@/utility/inputUtils/input-change-utils'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { ISectorInitialValue } from '../schema/sector.interface'
import {
  sectorInitialValue,
  sectorValidationSchema,
} from '../schema/sector.schema'
import { useCreateSector } from '../services/sector.query'

interface ISectorFormProps {
  initialValues: ISectorInitialValue
  setInitialValues: React.Dispatch<React.SetStateAction<ISectorInitialValue>>
}

const SectorForm = (props: ISectorFormProps) => {
  const { initialValues, setInitialValues } = props
  const { mutate, isLoading } = useCreateSector()

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
    validationSchema: sectorValidationSchema,
    onSubmit: (value) => {
      mutate(
        { ...value, orderNumber: +value.orderNumber },
        { onSuccess: () => resetFormValues() }
      )
    },
  })

  const resetFormValues = () => {
    resetForm()
    setInitialValues(sectorInitialValue)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            value={values.sectorNameEnglish}
            errors={errors}
            touched={touched}
            name="sectorNameEnglish"
            label={t('masterSetup.sector.sectorNameEnglish')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            isNepali
            value={values.sectorNameNepali}
            errors={errors}
            touched={touched}
            name="sectorNameNepali"
            label={t('masterSetup.sector.sectorNameNepali')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            value={values.orderNumber}
            errors={errors}
            touched={touched}
            name="orderNumber"
            label={t('masterSetup.sector.orderNumber')}
            onChange={(event) => {
              inputChangeNumberOnly({
                event,
                handleChange,
              })
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
        <Button disabled={isLoading} loading={isLoading} className="ml-auto">
          {t('btns.save')}
        </Button>
      </Box>
    </form>
  )
}

export default SectorForm
