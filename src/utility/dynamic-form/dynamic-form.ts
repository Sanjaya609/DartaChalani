import Form from '@/components/functional/Form/Form'
import { DYNAMICFORMFIELDTYPE } from '../enums/dynamic-form.enum'
import { dynamicForm } from '@/core/private/DynamicForm/AddDynamicForm/AddDynamicForm'
import React, { FunctionComponent } from 'react'
import { IInputProps } from '@/components/functional/Form/Input/Input'
import { generateDynamicError } from './generate-dynamic-error'
import { useFormik } from 'formik'
import { StringSchema, ArraySchema } from 'yup'

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
  form: any,
  formikConfig: ReturnType<typeof useFormik>
) => {
  const { values, handleChange, handleBlur, errors, setFieldValue, touched } =
    formikConfig

  console.log({ errors: errors[form.fieldControlName] })

  switch (form.fieldType) {
    case DYNAMICFORMFIELDTYPE.SELECT:
      return DynamicFormFieldTypeMapping.SELECT({
        onChange: (e) => {
          setFieldValue(e.name, e.main)
        },
        options: [],
        value: '',
        label: form.labelNameEnglish,
        id: form.fieldControlName,
        errors: errors,
        touched: touched,
        onBlur: handleBlur,
      })

    case DYNAMICFORMFIELDTYPE.NEPALICALENDAR:
      return DynamicFormFieldTypeMapping.NEPALICALENDAR({
        label: form.labelNameEnglish,
      })

    case DYNAMICFORMFIELDTYPE.TEXT:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.TEXT as FunctionComponent,
        {
          value: values?.[form.fieldControlName] || '',
          label: form.labelNameEnglish,
          id: form.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: handleChange,
          onBlur: handleBlur,
          isRequired: true,
        }
      )
  }
}

export const makeFieldsWithSchema = (form: typeof dynamicForm) => {
  let validationSchema: Record<
    string,
    StringSchema<TAny> | ArraySchema<TAny, TAny>
  > = {}
  const initialValues: Record<string, string> = {}

  form.forEach((field) => {
    initialValues[field.fieldControlName] = ''
    if (field?.fieldValidationList?.length) {
      const schema = generateDynamicError(
        field.fieldType as keyof typeof DynamicFormFieldTypeMapping,
        field.fieldValidationList
      )

      validationSchema = {
        ...validationSchema,
        [field.fieldControlName]: schema,
      }
    }
  })

  return {
    validationSchema,
    initialValues,
  }
}
