import FallbackLoader from '@/components/FallbackLoader'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Grid } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import { IAddGroupResponse } from '@/core/private/Recommendation/Fields/schema/group.interface'
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

// export const dynamicForm = [
//   {
//     id: 1,
//     recommendationId: 11,
//     recommendationName: 'फारम १',
//     recommendationNameNp: 'From 1',
//     fieldControlName: 'gender',
//     fieldType: 'SELECT',
//     orderNo: 1,
//     isValidationRequired: true,
//     labelNameEnglish: 'apple',
//     labelNameNepali: 'applenp',
//     className: 'ABC',
//     fieldValidationList: [
//       {
//         id: 1,
//         fieldId: 1,
//         validationType: 'NOT_NULL',
//         errorMessage: 'please enter value',
//         regex: null,
//       },
//     ],
//     dropDownResponse: {
//       id: 3,
//       dropDownCode: 'DROPDOWN2',
//       dropDownDescriptionEn: 'bank setup',
//       dropDownDescriptionNp: 'bank setup',
//       isActive: true,
//       dropDownDetailResponseDtoList: [
//         {
//           id: 26,
//           dropDownId: 3,
//           descriptionEn: 'Agriculture Dev Bank',
//           descriptionNp: 'Agriculture Dev Bank',
//           isActive: true,
//           field1: 'bankType',
//           value1: 'Development Bank',
//         },
//         {
//           id: 25,
//           dropDownId: 3,
//           descriptionEn: 'Laxmi Bank',
//           descriptionNp: 'Laxmi Bank Np',
//           isActive: true,
//           field1: 'bankType',
//           value1: 'Commercial Bank',
//         },
//         {
//           id: 27,
//           dropDownId: 3,
//           descriptionEn: 'Description Name',
//           descriptionNp: 'Description Nepali',
//           isActive: true,
//           field1: 'fieldName1',
//           value1: 'value1',
//           field2: 'fieldName2',
//           value2: 'value2',
//           field3: 'fieldName3',
//           value3: 'value3',
//         },
//       ],
//     },
//   },
//   {
//     id: 3,
//     recommendationId: 11,
//     recommendationName: 'फारम १',
//     recommendationNameNp: 'From 1',
//     fieldControlName: 'birthDate',
//     fieldType: 'NEPALICALENDAR',
//     orderNo: 1,
//     isValidationRequired: true,
//     labelNameEnglish: 'hello',
//     labelNameNepali: 'hellonp',
//     className: 'EFG',
//     fieldValidationList: [],
//     dropDownResponse: null,
//   },
//   {
//     id: 2,
//     recommendationId: 11,
//     recommendationName: 'फारम १',
//     recommendationNameNp: 'From 1',
//     fieldControlName: 'firstName',
//     fieldType: 'TEXT',
//     orderNo: 3,
//     isValidationRequired: true,
//     labelNameEnglish: 'test',
//     labelNameNepali: 'testnp',
//     className: 'BCD',
//     fieldValidationList: [
//       {
//         id: 1,
//         fieldId: 2,
//         validationType: 'NOT_NULL',
//         errorMessage: 'please enter value',
//         regex: null,
//       },
//       {
//         id: 1,
//         fieldId: 2,
//         validationType: 'MAX_LENGTH',
//         errorMessage: 'max length of 1 value',
//         regex: null,
//       },
//     ],
//     dropDownResponse: null,
//   },
// ]

const AddDynamicForm = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
  console.log({ currentModuleDetails })
  const location = useLocation()
  
  const [isFormFieldReady, setIsFormFieldReady] = useState(false)
  const [validationSchema, setValidationSchema] = useState<Record<string, any>>(
    Yup.object({})
  )
  const [initialValues, setInitialValues] = useState({})
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: dynamicFormData, isFetching: dynamicFormDataFetching } =
    useGetAllGroupByRecommendationId(currentModuleDetails?.id || null)

  const generateFieldWithValidationSchema = (form: IAddGroupResponse[]) => {
    const { initialValues, validationSchema } = makeFieldsWithSchema(form)
    setInitialValues(initialValues)
    setValidationSchema(Yup.object(validationSchema))
    setIsFormFieldReady(true)
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
      console.log(values)
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
          navigate(currentModuleDetails?.url || '-1', { state: { id: location?.state?.id!}})
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
