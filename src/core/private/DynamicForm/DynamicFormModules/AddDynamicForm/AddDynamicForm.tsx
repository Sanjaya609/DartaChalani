import FallbackLoader from '@/components/FallbackLoader'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Grid } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import { IAddGroupResponse } from '@/core/private/Recommendation/Fields/schema/group.interface'
import { useCreateFieldValue } from '@/core/private/Recommendation/Fields/services/fields.query'
import { useGetAllGroupByRecommendationId } from '@/core/private/Recommendation/Fields/services/groups.query'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { IRoutePrivilege } from '@/router/routes/create-route'
import {
  createFormInputFromFieldType,
  makeFieldsWithSchema,
} from '@/utility/dynamic-form/dynamic-form'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const AddDynamicForm = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
  console.log({ currentModuleDetails })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [isFormFieldReady, setIsFormFieldReady] = useState(false)
  const [validationSchema, setValidationSchema] = useState<Record<string, any>>(
    Yup.object({})
  )
  const [initialValues, setInitialValues] = useState({})
  const generateFieldWithValidationSchema = (form: IAddGroupResponse[]) => {
    const { initialValues, validationSchema } = makeFieldsWithSchema(form)
    setInitialValues(initialValues)
    setValidationSchema(Yup.object(validationSchema))
    setIsFormFieldReady(true)
  }
  console.log(initialValues, 'filter initial value')
  const { data: dynamicFormData, isFetching: dynamicFormDataFetching } =
    useGetAllGroupByRecommendationId(currentModuleDetails?.id || null)

  const { mutate: createFieldValue, isLoading: createFieldValueLoading } =
    useCreateFieldValue()

  const handleAddFieldValue = (values: any) => {
    const transformedArray: { fieldId: number; value: string }[] =
      Object.values(values)
    const reqData = {
      fieldValueListRequestList: transformedArray,
      formId: currentModuleDetails?.id!,
      formValueId: 0,
    }
    createFieldValue(reqData, {
      onSuccess: () => {
        navigate(-1)
      },
    })
  }

  useEffect(() => {
    if (dynamicFormData) {
      generateFieldWithValidationSchema(dynamicFormData)
    }
  }, [dynamicFormData])

  console.log({ validationSchema })

  const formikConfig = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleAddFieldValue(values)
    },
  })

  return dynamicFormDataFetching ? (
    <FallbackLoader />
  ) : isFormFieldReady && !dynamicFormDataFetching ? (
    <>
      <SectionHeader
        parentTitle={getTextByLanguage(
          currentModuleDetails?.moduleNameEnglish || '',
          currentModuleDetails?.moduleNameNepali || ''
        )}
        title={t('btns.add')}
        backAction={() => {
          navigate(currentModuleDetails?.url || '-1', {
            state: { id: location?.state?.id! },
          })
        }}
      />
      <ContainerLayout className="scrollbars grow ">
        <form>
          {dynamicFormData?.map((group) => (
            <Box className="mb-3">
              <Grid.Col sm={'sm:col-span-12'} className="mb-3">
                <Text variant="h5" typeface="semibold">
                  {getTextByLanguage(group.nameEnglish, group.nameNepali)}
                </Text>
              </Grid.Col>
              <Grid
                key={group.id}
                sm={'sm:grid-cols-12'}
                gap="gap-4"
                className="mb-4"
              >
                {group?.fieldResponseList?.map((field) => (
                  <Grid.Col key={field.id} sm={'sm:col-span-3'}>
                    {createFormInputFromFieldType(field, formikConfig)}
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          ))}
        </form>
      </ContainerLayout>

      <Box className="mb-10 w-full border-t-2 text-right">
        <ContainerLayout>
          <Button
            type="button"
            btnType="outlined"
            variant="secondary"
            className="mr-3"
          >
            {t('btns.cancel')}
          </Button>
          <Button
            type="submit"
            onClick={() => formikConfig.handleSubmit()}
            className="ml-auto"
          >
            {t('btns.save')}
          </Button>
        </ContainerLayout>
      </Box>
    </>
  ) : (
    <>Form setup not completed</>
  )
}

export default AddDynamicForm
