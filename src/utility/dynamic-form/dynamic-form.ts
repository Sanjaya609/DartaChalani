import Form from '@/components/functional/Form/Form'
import { DYNAMICFORMFIELDTYPE } from '../enums/dynamic-form.enum'
import React, { FunctionComponent } from 'react'
import { IInputProps } from '@/components/functional/Form/Input/Input'
import { generateDynamicError } from './generate-dynamic-error'
import { useFormik } from 'formik'
import { StringSchema, ArraySchema } from 'yup'
import { IAddGroupResponse } from '@/core/private/Recommendation/Fields/schema/group.interface'
import { IAddFieldInitialValue } from '@/core/private/Recommendation/Fields/schema/field.interface'

export const DynamicFormFieldTypeMapping = {
  SELECT: Form.Select,
  MULTISELECT: Form.Select,
  TEXT: Form.Input,
  NUMBER: Form.Input,
  NEPALICALENDAR: Form.NepaliDatePicker,
  ENGLISHCALENDAR: Form.EnglishDatePicker,
  RADIO: Form.Radio,
  CHECKBOX: Form.CheckBox,
  TEXTAREA: Form.TextArea,
}

export const createFormInputFromFieldType = (
  field: IAddFieldInitialValue,
  formikConfig: ReturnType<typeof useFormik>
) => {
  const { values, handleChange, handleBlur, errors, setFieldValue, touched } =
    formikConfig

  switch (field.fieldType) {
    case DYNAMICFORMFIELDTYPE.SELECT:
      return DynamicFormFieldTypeMapping.SELECT({
        onChange: (e) => {
          setFieldValue(e.name, e.main)
        },
        options: [],
        value: '',
        label: field.labelNameEnglish,
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onBlur: handleBlur,
      })

    case DYNAMICFORMFIELDTYPE.NEPALICALENDAR:
      return DynamicFormFieldTypeMapping.NEPALICALENDAR({
        label: field.labelNameEnglish,
      })

    case DYNAMICFORMFIELDTYPE.INPUT:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.TEXT as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string] || '',
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: handleChange,
          onBlur: handleBlur,
          isRequired: true,
        }
      )
  }
}

export const makeFieldsWithSchema = (form: IAddGroupResponse[]) => {
  let validationSchema: Record<
    string,
    StringSchema<TAny> | ArraySchema<TAny, TAny>
  > = {}
  const initialValues: Record<string, string> = {}
  const flatGroupFormData = form.reduce<IAddFieldInitialValue[]>(
    (allForm, currForm) => {
      let currFormData = [...allForm]
      if (currForm.fieldResponseList) {
        currFormData = [...currFormData, ...currForm.fieldResponseList]
      }
      return currFormData
    },
    []
  )

  flatGroupFormData.forEach((field) => {
    initialValues[field.fieldControlName as string] = ''
    // if (field?.fieldValidationList?.length) {
    //   const schema = generateDynamicError(
    //     field.fieldType as keyof typeof DynamicFormFieldTypeMapping,
    //     field.fieldValidationList
    //   )

    //   validationSchema = {
    //     ...validationSchema,
    //     [field.fieldControlName]: schema,
    //   }
    // }
  })

  return {
    validationSchema,
    initialValues,
  }
}