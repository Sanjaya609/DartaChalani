import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IAddFieldInitialValue,
  IAddFieldPayload,
} from '../ConfigureRecommendation/schema/field.interface'
import {
  addFieldInitialValues,
  addFieldValidationSchema,
} from '../ConfigureRecommendation/schema/field.schema'
import { useGetEnumDataWithValue } from '@/service/generic/generic.query'
import { APIENUM } from '@/utility/enums/api.enum'
import {
  useCreateField,
  useGetFieldDetailById,
} from '../ConfigureRecommendation/services/fields.query'

const AddField = ({
  editId,
  formId,
}: {
  editId?: number
  formId: string | number
}) => {
  const { t } = useTranslation()
  const [initialFieldValue, setInitialFieldValue] = useState(
    addFieldInitialValues
  )

  // GET Field Type for dropdown
  const { data: fieldTypeOptions = [], isLoading: fieldTypeFetching } =
    useGetEnumDataWithValue<OptionType[]>(APIENUM.FIELD_TYPE, {
      mapDatatoStyleSelect: false,
    })

  const { data: fieldDetails } = useGetFieldDetailById(editId ?? '')

  const { mutate: createField, isLoading: createFieldLoading } =
    useCreateField()

  const handleAddField = (values: IAddFieldInitialValue) => {
    const {
      id,
      dropDownId,
      fieldControlName,
      fieldType,
      isValidationRequired,
      orderNo,
      labelNameEnglish,
      labelNameNepali,
      className,
    } = values

    const reqData: IAddFieldPayload = {
      id: id,
      dropDownId,
      fieldControlName,
      fieldType,
      isValidationRequired,
      orderNo,
      recommendationId: formId,
      labelNameEnglish,
      labelNameNepali,
      className,
    }

    createField(reqData, {
      onSuccess: () => {
        setInitialFieldValue(addFieldInitialValues)
        resetForm()
      },
    })
  }

  useEffect(() => {
    debugger
    if (fieldDetails) {
      const {
        id,
        labelNameEnglish,
        labelNameNepali,
        fieldControlName,
        fieldType,
        isValidationRequired,
        orderNo,
        className,
        dropDownId,
      } = fieldDetails
      setInitialFieldValue({
        id,
        dropDownId,
        fieldControlName,
        fieldType,
        isValidationRequired,
        orderNo,
        recommendationId: formId,
        labelNameEnglish,
        labelNameNepali,
        className,
      })
    }
  }, [fieldDetails, editId])

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
    switch (fieldType) {
      case 'INPUT':
        return (
          <Grid.Col sm={'sm:col-span-12'} key="inputField">
            <Grid.Col sm={'sm:col-span-12'}>
              <Form.Input
                isRequired
                value={values.fieldControlName}
                errors={errors}
                touched={touched}
                name="fieldControlName"
                label={t('recommendation.fieldName')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-12'}>
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

            <Grid.Col sm={'sm:col-span-12'}>
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

            <Grid.Col sm={'sm:col-span-12'}>
              <Form.Input
                isRequired
                value={values.orderNo}
                errors={errors}
                touched={touched}
                name="orderNo"
                label={t('recommendation.orderNo')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-12'}>
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
          </Grid.Col>
        )

      case 'SELECT':
        return <Grid.Col sm={'sm:col-span-12'} key="selectField"></Grid.Col>

      case 'CHECKBOX':
        return <Grid.Col sm={'sm:col-span-12'} key="checkboxField"></Grid.Col>

      case 'RADIO':
        return <Grid.Col sm={'sm:col-span-12'} key="radioField"></Grid.Col>

      case 'FILE':
        return <Grid.Col sm={'sm:col-span-12'} key="fileField"></Grid.Col>

      case 'DATEPICKER':
        return <Grid.Col sm={'sm:col-span-12'} key="datepickerField"></Grid.Col>

      default:
        return null
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 bg-blue-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center text-lg font-semibold">
              <i className="fas fa-wpforms mr-2"></i>
              Field Details
            </h1>
            <button
              type="submit"
              className="flex items-center rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
            >
              <i className="fas fa-plus-circle mr-2"></i>
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
        <Grid sm={'sm:grid-cols-12'} gap="gap-4">
          <Grid.Col sm={'sm:col-span-12'}>
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

          {renderAdditionalFields(
            values.fieldType,
            values,
            handleChange,
            handleBlur
          )}
        </Grid>
      </form>
    </>
  )
}

export default AddField
