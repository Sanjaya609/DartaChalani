import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import { useGetConfigurableModuleList } from '@/core/private/Security/ModuleSetup/services/moduleSetup.query'
import { useGetEnumDataWithValue } from '@/service/generic/generic.query'
import { APIENUM } from '@/utility/enums/api.enum'
import { inputChangeNumberOnly } from '@/utility/inputUtils/input-change-utils'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useGetAllDocumentType } from '../../DocumentType/services/document-type.query'
import { IModuleDocumentMappingInitialValue } from '../schema/module-document-mapping.interface'
import {
  documentTypeInitialValue,
  documentTypeValidationSchema,
} from '../schema/module-document-mapping.schema'
import { useCreateModuleDocumentMapping } from '../services/module-document-mapping.query'

interface IModuleDocumentMappingFormProps {
  initialValues: IModuleDocumentMappingInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IModuleDocumentMappingInitialValue>
  >
}

const ModuleDocumentMappingForm = (props: IModuleDocumentMappingFormProps) => {
  const { initialValues, setInitialValues } = props
  const { mutate, isLoading } = useCreateModuleDocumentMapping()

  const {
    data: documentModuleNameOption = [],
    isFetching: moduleNameFetching,
  } = useGetConfigurableModuleList<OptionType[]>({
    mapDatatoStyleSelect: true,
  })

  const { data: documentTypeData = [], isFetching: documentTypeDataFetching } =
    useGetAllDocumentType<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

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
    onSubmit: (value, { resetForm }) => {
      mutate(
        {
          ...value,
        },
        {
          onSuccess: () => {
            resetFormValues()
            resetForm()
          },
        }
      )
    },
  })

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Select
            isLoading={moduleNameFetching}
            options={documentModuleNameOption}
            calculateValueOnChange
            value={values.moduleId}
            errors={errors}
            touched={touched}
            name="moduleId"
            label={t('masterSetup.documentType.moduleName')}
            onChange={(event) => {
              setFieldValue(event.name, event?.main || '')
            }}
            onBlur={handleBlur}
          />
        </Grid.Col>

        <Grid.Col sm={'sm:col-span-4'}>
          <Form.Select
            isLoading={documentTypeDataFetching}
            options={documentTypeData}
            calculateValueOnChange
            value={values.documentTypeId}
            errors={errors}
            touched={touched}
            name="documentTypeId"
            label={t('masterSetup.moduleDocumentMapping.documentTypeId')}
            onChange={(event) => {
              setFieldValue(event.name, event?.main || '')
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

export default ModuleDocumentMappingForm
