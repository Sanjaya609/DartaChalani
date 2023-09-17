import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import formatDate from '@/utility/date/dateFunction'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFiscalYearInitialValue } from '../schema/fiscalyear.interface'
import {
  fiscalYearInitialValue,
  fiscalYearValidationSchema,
} from '../schema/fiscalyear.schema'
import { useCreateFiscalYear } from '../services/fiscalyear.query'

interface IFiscalYearFormProps {
  initialValues: IFiscalYearInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IFiscalYearInitialValue>
  >
}

const FiscalYearForm = (props: IFiscalYearFormProps) => {
  const { initialValues, setInitialValues } = props
  const { mutate } = useCreateFiscalYear()

  const { t } = useTranslation()

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: fiscalYearValidationSchema,
    onSubmit: (value, { resetForm }) => {
      mutate(value, { onSuccess: () => resetForm() })
    },
  })

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            value={values.fiscalYearNameEn}
            errors={errors}
            touched={touched}
            name="fiscalYearNameEn"
            label={t('masterSetup.fiscalYear.fiscalYearNameEn')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            value={values.fiscalYearNameNp}
            errors={errors}
            touched={touched}
            name="fiscalYearNameNp"
            label={t('masterSetup.fiscalYear.fiscalYearNameNp')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.NepaliDatePicker
            value={values.startDateBs}
            errors={errors}
            touched={touched}
            name="startDateBs"
            label={t('masterSetup.fiscalYear.startDateBs')}
            onChange={(nepDate, engDate) => {
              setFieldValue('startDateAd', engDate ? formatDate(engDate) : '')
              setFieldValue('startDateBs', nepDate)
            }}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.EnglishDatePicker
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.startDateAd}
            name="startDateAd"
            label={t('masterSetup.fiscalYear.startDateAd')}
            onChange={(engDate, nepDate) => {
              setFieldValue('startDateAd', engDate ? formatDate(engDate) : '')
              setFieldValue('startDateBs', nepDate)
            }}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-3'}>
          <Form.NepaliDatePicker
            value={values.endDateBs}
            errors={errors}
            touched={touched}
            name="endDateBs"
            label={t('masterSetup.fiscalYear.endDateBs')}
            onChange={(nepDate, engDate) => {
              setFieldValue('endDateAd', engDate ? formatDate(engDate) : '')
              setFieldValue('endDateBs', nepDate)
            }}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.EnglishDatePicker
            errors={errors}
            touched={touched}
            value={values.endDateAd}
            name="endDateAd"
            label={t('masterSetup.fiscalYear.endDateAd')}
            onChange={(engDate, nepDate) => {
              setFieldValue('endDateAd', engDate ? formatDate(engDate) : '')
              setFieldValue('endDateBs', nepDate)
            }}
          />
        </Grid.Col>
      </Grid>

      <Box className="mt-4 text-right">
        {initialValues?.id && (
          <Button
            type="button"
            onClick={() => {
              setInitialValues(fiscalYearInitialValue)
            }}
            btnType="outlined"
            variant="secondary"
            className="mr-3"
          >
            {t('btns.cancel')}
          </Button>
        )}
        <Button className="ml-auto">{t('btns.save')}</Button>
      </Box>
    </form>
  )
}

export default FiscalYearForm
