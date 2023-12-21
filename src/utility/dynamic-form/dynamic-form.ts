import Form from '@/components/functional/Form/Form'
import { DYNAMICFORMFIELDTYPE } from '../enums/dynamic-form.enum'
import { dynamicForm } from '@/core/private/DynamicForm/DynamicForm'
import React, { FunctionComponent } from 'react'
import { IInputProps } from '@/components/functional/Form/Input/Input'
import { generateDynamicError } from './generate-dynamic-error'

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

export const createFormInputFromFieldType = (form: any) => {
  switch (form.fieldType) {
    case DYNAMICFORMFIELDTYPE.SELECT:
      return DynamicFormFieldTypeMapping.SELECT({
        onChange: () => {
          console.log('test')
        },
        options: [],
        value: '',
        label: form.labelNameEnglish,
      })

    case DYNAMICFORMFIELDTYPE.NEPALICALENDAR:
      return DynamicFormFieldTypeMapping.NEPALICALENDAR({
        label: form.labelNameEnglish,
      })

    case DYNAMICFORMFIELDTYPE.TEXT:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.TEXT as FunctionComponent,
        {
          value: '',
          label: form.labelNameEnglish,
        }
      )
  }
}

export const makeFieldsWithSchema = (form: typeof dynamicForm) => {
  const validationSchema = {}
  const initialValues: Record<string, string> = {}

  form.forEach((field) => {
    initialValues[field.fieldControlName] = ''
    if (field.fieldValidationList) {
      generateDynamicError(field.fieldValidationList)
    }
  })

  return {
    validationSchema,
    initialValues,
  }
}
