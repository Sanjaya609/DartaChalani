import Form from '@/components/functional/Form/Form'
import { Button, Flexbox, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetEnumDataWithValue } from '@/service/generic/generic.query'
import { APIENUM } from '@/utility/enums/api.enum'
import { Text } from '@/components/ui/core/Text'
import {
  addFieldInitialValues,
  addFieldValidationSchema,
} from './schema/field.schema'
import { useCreateField, useGetFieldDetailById } from './services/fields.query'
import {
  IAddFieldInitialValue,
  IAddFieldPayload,
} from './schema/field.interface'
import { useParams } from 'react-router-dom'
import { decodeParams } from '@/utility/route-params'

const AddField = ({
  fieldId,
  setFieldId,
  groupId,
  setShowAddOrEditForm,
}: {
  fieldId?: number
  setFieldId:  Dispatch<SetStateAction<number | null | undefined>>
  groupId: number
  setShowAddOrEditForm: Dispatch<SetStateAction<boolean>>
}) => {
  console.log(fieldId, "filter here")
  const { t } = useTranslation()
  const params = useParams()
  const recommendationId = decodeParams<string>(params?.id)
  const [initialFieldValue, setInitialFieldValue] = useState(
    addFieldInitialValues
  )

  // GET Field Type for dropdown
  const { data: fieldTypeOptions = [], isLoading: fieldTypeFetching } =
    useGetEnumDataWithValue<OptionType[]>(APIENUM.FIELD_TYPE, {
      mapDatatoStyleSelect: false,
    })

  const { data: fieldDetails } = useGetFieldDetailById(fieldId ?? '')

  const { mutate: createField, isLoading: createFieldLoading } =
    useCreateField()

  const handleAddField = (values: IAddFieldInitialValue) => {
    const {
      id,
      dropDownId,
      fieldType,
      isValidationRequired,
      labelNameEnglish,
      labelNameNepali,
      className,
    } = values

    const reqData: IAddFieldPayload = {
      id: id,
      dropDownId,
      fieldType,
      isValidationRequired,
      labelNameEnglish,
      labelNameNepali,
      className,
      groupingId: groupId,
      recommendationId: recommendationId!,
    }

    createField(reqData, {
      onSuccess: () => {
        setInitialFieldValue(addFieldInitialValues)
        setShowAddOrEditForm(false)
        resetForm()
      },
    })
  }

  useEffect(() => {
    if (fieldDetails) {
      const {
        id,
        labelNameEnglish,
        labelNameNepali,
        fieldType,
        isValidationRequired,
        className,
        dropDownId,
        groupingId,
      } = fieldDetails
      setInitialFieldValue({
        id,
        dropDownId,
        fieldType,
        isValidationRequired,
        labelNameEnglish,
        labelNameNepali,
        className,
        groupingId,
        recommendationId: recommendationId!,
      })
    }
  }, [fieldDetails, fieldId])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialFieldValue,
    enableReinitialize: true,
    validationSchema: addFieldValidationSchema,
    onSubmit: (values) => {
      handleAddField(values)
    },
  })

  const renderAdditionalFields = (
    fieldType: string,
    values: IAddFieldInitialValue,
    handleChange: any,
    handleBlur: any
  ) => {
    let renderByFieldType = () => {
      switch (fieldType) {
        case 'INPUT':
          return <></>

        case 'SELECT':
          return <Grid.Col sm={'sm:col-span-12'} key="selectField"></Grid.Col>

        case 'CHECKBOX':
          return <Grid.Col sm={'sm:col-span-12'} key="checkboxField"></Grid.Col>

        case 'RADIO':
          return <Grid.Col sm={'sm:col-span-12'} key="radioField"></Grid.Col>

        case 'FILE':
          return <Grid.Col sm={'sm:col-span-12'} key="fileField"></Grid.Col>

        case 'DATEPICKER':
          return (
            <Grid.Col sm={'sm:col-span-12'} key="datepickerField"></Grid.Col>
          )

        default:
          return null
      }
    }

    if (values.fieldType)
      return (
        <>
          <Grid.Col sm={'sm:col-span-4'}>
            <Form.Input
              isRequired
              value={values.labelNameEnglish}
              errors={errors}
              touched={touched}
              name="labelNameEnglish"
              label={t('recommendation.labelNameEnglish')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid.Col>

          <Grid.Col sm={'sm:col-span-4'}>
            <Form.Input
              isNepali
              isRequired
              value={values.labelNameNepali}
              errors={errors}
              touched={touched}
              name="labelNameNepali"
              label={t('recommendation.labelNameNepali')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid.Col>

          <Grid.Col sm={'sm:col-span-4'}>
            <Form.Switch
              isRequired
              className="inline"
              checked={values.isValidationRequired}
              errors={errors}
              touched={touched}
              name="isValidationRequired"
              label={t('recommendation.isValidationRequired')}
              onChange={() => {
                setFieldValue(
                  'isValidationRequired',
                  !values.isValidationRequired
                )
              }}
              onBlur={handleBlur}
            />
          </Grid.Col>

          {renderByFieldType()}
        </>
      )
  }

  return (
    <>
      <Flexbox
        align="center"
        justify="space-between"
        className="my-2 w-full p-3 pb-1"
      >
        <Text typeface="extrabold" className="text-primary" variant="h5">
          Field Details
        </Text>
        <div className="h-px flex-auto bg-gray-100"></div>
      </Flexbox>
      <form onSubmit={handleSubmit} className="ml-3">
        <Grid sm={'sm:grid-cols-12'} gap="gap-4">
          <Grid.Col sm={'sm:col-span-4'}>
            <Form.Select
              isRequired
              isLoading={fieldTypeFetching}
              options={fieldTypeOptions?.map((field) => {
                return { value: field.key, label: field.nameEnglish }
              })}
              calculateValueOnChange
              value={values.fieldType}
              errors={errors}
              touched={touched}
              name="fieldType"
              label={t('recommendation.fieldType')}
              onChange={(event) => {
                setFieldValue(event.name, event?.main || '')
              }}
              onBlur={handleBlur}
            />
          </Grid.Col>
        </Grid>

        <Grid sm={'sm:grid-cols-12'} gap="gap-6" className="mt-5">
          {renderAdditionalFields(
            values.fieldType,
            values,
            handleChange,
            handleBlur
          )}
        </Grid>

        <Flexbox align="flex-end" justify="flex-end">
          <Button
            size="md"
            type="button"
            variant="danger"
            icons="icons"
            className="ml-4 whitespace-nowrap border border-gray-80"
            onClick={() => {
              setShowAddOrEditForm(false)
              setFieldId(null)
              setInitialFieldValue(addFieldInitialValues)
            }}
          >
            Close
          </Button>
          <Button
            size="md"
            type="submit"
            variant="success"
            icons="icons"
            className="ml-4 whitespace-nowrap border border-gray-80"
          >
            {fieldId ? 'Update' : 'Add'}
          </Button>
        </Flexbox>
      </form>
    </>
  )
}

export default AddField
