import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IAddFieldInitialValue,
  IAddFieldPayload,
} from './schema/field.interface'
import {
  addFieldInitialValues,
  addFieldValidationSchema,
} from './schema/field.schema'
import { useCreateField, useGetFieldDetailById } from './services/fields.query'
import Modal from '@/components/ui/Modal/Modal'
import { useGetEnumDataWithValue } from '@/service/generic/generic.query'
import { APIENUM } from '@/utility/enums/api.enum'

const AddField = ({
  toggleRecommendationForm,
  openRecommendationForm,
  editId,
  viewOnly,
  setViewOnly,
  formId,
}: {
  toggleRecommendationForm: VoidFunction
  openRecommendationForm: boolean
  editId?: number
  viewOnly?: boolean
  setViewOnly?: React.Dispatch<React.SetStateAction<boolean>>
  formId: null | number
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
      groupingId,
    } = values

    const reqData: IAddFieldPayload = {
      id: id || undefined,
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
        toggleRecommendationForm()
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
  }, [fieldDetails])

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

  return (
    <>
      <Modal
        open={!!openRecommendationForm}
        toggleModal={() => {
          toggleRecommendationForm()
          setInitialFieldValue(addFieldInitialValues)
          setViewOnly && setViewOnly(false)
        }}
        size="md"
        title={
          editId
            ? t('recommendation.editRecommendation')
            : t('recommendation.addRecommendation')
        }
        saveBtnProps={{
          btnAction: handleSubmit,
          loading: createFieldLoading,
          btnTitle: t('btns.save'),
        }}
        cancelBtnProps={{
          btnAction: () => {
            toggleRecommendationForm()
            loading: createFieldLoading
            setInitialFieldValue(addFieldInitialValues)
            setViewOnly && setViewOnly(false)
          },
        }}
      >
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                disabled={viewOnly}
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

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Select
                isDisabled={viewOnly}
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

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                disabled={viewOnly}
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

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                disabled={viewOnly}
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

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                disabled={viewOnly}
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

            <Grid.Col sm={'sm:col-span-2'}>
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
          </Grid>
        </form>
      </Modal>
    </>
  )
}

export default AddField
