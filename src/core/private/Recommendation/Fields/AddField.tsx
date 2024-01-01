import Form from '@/components/functional/Form/Form'
import { Button, Flexbox, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { Text } from '@/components/ui/core/Text'
import AddGroup from './AddGroup'

const AddField = ({
  editId,
  formId,
  setShowAddOrEditForm,
}: {
  editId?: number
  formId: number | null
  setShowAddOrEditForm: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation()
  const [initialFieldValue, setInitialFieldValue] = useState(
    addFieldInitialValues
  )

  const [edittId, setEdittId] = useState<number>()
  const [viewOnly, setViewOnly] = useState(false)
  const [openRecommendationForm, setOpenRecommendationForm] =
    useState<boolean>(false)
  const toggleRecommendationForm = () =>
    setOpenRecommendationForm(!openRecommendationForm)

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
      groupingId,
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
      groupingId,
    }

    createField(reqData, {
      onSuccess: () => {
        setInitialFieldValue(addFieldInitialValues)
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
        fieldControlName,
        fieldType,
        isValidationRequired,
        orderNo,
        className,
        dropDownId,
        groupingId,
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
        groupingId,
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
              value={values.fieldControlName}
              errors={errors}
              touched={touched}
              name="fieldControlName"
              label={t('recommendation.fieldName')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid.Col>

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
              options={[
                {
                  label: 'Create New Group',
                  value: 'NEW_GROUP',
                },
              ]}
              calculateValueOnChange
              value={values.groupingId}
              errors={errors}
              touched={touched}
              name="groupingId"
              label="Group"
              onChange={(event) => {
                // setFieldValue(event.name, event?.main || '')
                if (event.main === 'NEW_GROUP') {
                  toggleRecommendationForm()
                }
              }}
              onBlur={handleBlur}
            />
          </Grid.Col>

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
            {editId ? 'Update' : 'Add'}
          </Button>
        </Flexbox>
      </form>

      <AddGroup
        toggleRecommendationForm={() => {
          toggleRecommendationForm()
          setEdittId(undefined)
        }}
        openRecommendationForm={openRecommendationForm}
        editId={edittId}
        viewOnly={viewOnly}
        setViewOnly={setViewOnly}
        formId={formId!}
      />
    </>
  )
}

export default AddField
