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
} from '../schema/field.schema'
import { useCreateField, useGetFieldDetailById } from '../services/fields.query'
import {
  IAddFieldInitialValue,
  IAddFieldPayload,
} from '../schema/field.interface'
import { useParams } from 'react-router-dom'
import { decodeParams } from '@/utility/route-params'
import GeneralFields from './FieldTypes/GeneralFields'
import SwitchFields from './FieldTypes/SwitchFields'
import RadioFields from './FieldTypes/RadioFields'

const AddField = ({
  fieldId,
  setFieldId,
  groupId,
  setShowAddOrEditForm,
}: {
  fieldId?: number
  setFieldId: Dispatch<SetStateAction<number | null | undefined>>
  groupId: number
  setShowAddOrEditForm: Dispatch<SetStateAction<boolean>>
}) => {
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
      gridLength,
      showInList,
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
      gridLength,
      showInList,
    }

    createField(reqData, {
      onSuccess: () => {
        setInitialFieldValue(addFieldInitialValues)
        setShowAddOrEditForm(false)
        formikProps.resetForm()
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
        gridLength,
        showInList,
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
        gridLength,
        showInList,
      })
    }
  }, [fieldDetails, fieldId])

  const formikProps = useFormik({
    initialValues: initialFieldValue,
    enableReinitialize: true,
    validationSchema: addFieldValidationSchema,
    onSubmit: (values) => {
      handleAddField(values)
    },
  })

  const renderAdditionalFields = () => {
    let renderByFieldType = () => {
      switch (formikProps.values.fieldType.toUpperCase()) {
        case 'INPUT':
          return <></>

        case 'SELECT':
          return <SwitchFields formikProps={formikProps} t={t} />

        case 'CHECKBOX':
          return <RadioFields formikProps={formikProps} t={t} />

        case 'RADIO':
          return <RadioFields formikProps={formikProps} t={t} />

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

    if (formikProps.values.fieldType)
      return (
        <>
          <GeneralFields formikProps={formikProps} t={t} />

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
      <form onSubmit={formikProps.handleSubmit} className="ml-3">
        <Grid sm={'sm:grid-cols-12'} gap="gap-4">
          <Grid.Col sm={'sm:col-span-4'}>
            <Form.Select
              isRequired
              isLoading={fieldTypeFetching}
              options={fieldTypeOptions?.map((field) => {
                return { value: field.key, label: field.nameEnglish }
              })}
              calculateValueOnChange
              value={formikProps.values.fieldType}
              errors={formikProps.errors}
              touched={formikProps.touched}
              name="fieldType"
              label={t('recommendation.fieldType')}
              onChange={(event) => {
                formikProps.setFieldValue(event.name, event?.main || '')
              }}
              onBlur={formikProps.handleBlur}
            />
          </Grid.Col>
        </Grid>

        <Grid sm={'sm:grid-cols-12'} gap="gap-6" className="mt-5">
          {renderAdditionalFields()}
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
