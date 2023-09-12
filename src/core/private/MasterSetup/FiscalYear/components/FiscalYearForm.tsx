import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import formatDate from '@/utility/date/dateFunction'
import { useFormik } from 'formik'
import { IFiscalYearInitialValue } from '../schema/fiscalyear.interface'
import { fiscalYearValidationSchema } from '../schema/fiscalyear.schema'
import { useCreateFiscalYear } from '../services/fiscalyear.query'

interface IFiscalYearFormProps {
  initialValues: IFiscalYearInitialValue
}

const FiscalYearForm = (props: IFiscalYearFormProps) => {
  const { initialValues } = props
  const { mutate } = useCreateFiscalYear()

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
    validationSchema: fiscalYearValidationSchema,
    onSubmit: (value, { resetForm }) => {
      mutate(value, { onSuccess: () => resetForm() })
    },
  })

  return (
    <form onSubmit={handleSubmit}>
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-3'}>
          <Form.Input
            value={values.fiscalYearNameEn}
            errors={errors}
            touched={touched}
            name="fiscalYearNameEn"
            label={'Fiscal Year Name (English)'}
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
            label={'Fiscal Year Name (Nepali)'}
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
            label={'Start Date (Nepali)'}
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
            label={'Start Date (English)'}
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
            label={'End Date (Nepali)'}
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
            label={'End Date (English)'}
            onChange={(engDate, nepDate) => {
              setFieldValue('endDateAd', engDate ? formatDate(engDate) : '')
              setFieldValue('endDateBs', nepDate)
            }}
          />
        </Grid.Col>
      </Grid>

      <Box className="mt-4 text-right">
        <Button className="ml-auto">Save</Button>
      </Box>
    </form>
  )
}

export default FiscalYearForm
