import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import {
  allowedFileTypeOption,
  DOCUMENTMODULENAME,
} from '@/utility/document/document-enum'
import { inputChangeNumberOnly } from '@/utility/inputUtils/input-change-utils'
import { useFormik } from 'formik'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IDocumentTypeInitialValue } from '../schema/document-type.interface'
import {
  documentTypeInitialValue,
  documentTypeValidationSchema,
} from '../schema/document-type.schema'
import { useCreateDocumentType } from '../services/document-type.query'

interface IDocumentTypeFormProps {
  initialValues: IDocumentTypeInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IDocumentTypeInitialValue>
  >
}

const DocumentTypeForm = (props: IDocumentTypeFormProps) => {
  const { initialValues, setInitialValues } = props
  const { mutate, isLoading } = useCreateDocumentType()

  const documentModuleNameOption = useMemo(() => {
    return Object.values(DOCUMENTMODULENAME).map((document) => ({
      label: document,
      value: document,
    }))
  }, [])

  const { t } = useTranslation()

  const resetFormValues = () => {
    setInitialValues(documentTypeInitialValue)
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: documentTypeValidationSchema,
    onSubmit: (value) => {
      mutate(
        {
          ...value,
          maxFileSize: +values.maxFileSize,
          moduleName: String(values.moduleName),
        },
        { onSuccess: () => resetFormValues() }
      )
    },
  })

  console.log({
    allowedFiles: allowedFileTypeOption?.filter((fileType) =>
      values?.allowedFileTypes.find((allowType) => allowType === fileType.value)
    ),
  })

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            value={values.documentTypeEn}
            errors={errors}
            touched={touched}
            name="documentTypeEn"
            label={t('masterSetup.documentType.documentTypeEn')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Input
            isNepali
            value={values.documentTypeNp}
            errors={errors}
            touched={touched}
            name="documentTypeNp"
            label={t('masterSetup.documentType.documentTypeNp')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-2'}>
          <Form.Input
            value={values.maxFileSize}
            errors={errors}
            touched={touched}
            name="maxFileSize"
            label={t('masterSetup.documentType.maxFileSize')}
            onChange={(event) => {
              inputChangeNumberOnly({
                event,
                handleChange,
              })
            }}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-2'}>
          <Form.Switch
            className="inline"
            checked={values.isMandatory}
            errors={errors}
            touched={touched}
            name="isMandatory"
            label={t('masterSetup.documentType.isMandatory')}
            onChange={() => {
              setFieldValue('isMandatory', !values.isMandatory)
            }}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Select
            options={documentModuleNameOption}
            calculateValueOnChange
            value={values.moduleName as unknown as OptionType[]}
            errors={errors}
            touched={touched}
            name="moduleName"
            label={t('masterSetup.documentType.moduleName')}
            onChange={(event) => {
              setFieldValue('moduleName', event?.main || '')
            }}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Select
            options={allowedFileTypeOption}
            multiCheckbox
            value={
              (allowedFileTypeOption?.filter((fileType) =>
                values?.allowedFileTypes.find(
                  (allowType) => allowType === fileType.value
                )
              ) || []) as unknown as OptionType[]
            }
            errors={errors}
            touched={touched}
            name="allowedFileTypes"
            label={t('masterSetup.documentType.allowedFileTypes')}
            onChange={(e) => {
              setFieldValue(
                'allowedFileTypes',
                e.value?.map((file: OptionType) => file.value) || []
              )
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

export default DocumentTypeForm