import Form from '@/components/functional/Form/Form'
import { DYNAMICFORMFIELDTYPE } from '../enums/dynamic-form.enum'
import React, { FunctionComponent } from 'react'
import { IInputProps } from '@/components/functional/Form/Input/Input'
import { generateDynamicError } from './generate-dynamic-error'
import { useFormik } from 'formik'
import { StringSchema, ArraySchema } from 'yup'
import { IAddGroupResponse } from '@/core/private/Recommendation/Fields/schema/group.interface'
import { IAddFieldInitialValue } from '@/core/private/Recommendation/Fields/schema/field.interface'
import formatDate from '../date/dateFunction'

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

    console.log(values, "filter here this")

  switch (field.fieldType.toUpperCase()) {
    case DYNAMICFORMFIELDTYPE.NEPALICALENDAR:
      return DynamicFormFieldTypeMapping.NEPALICALENDAR({
        label: field.labelNameEnglish,
      })

    case DYNAMICFORMFIELDTYPE.ENGLISHCALENDAR:
      return DynamicFormFieldTypeMapping.ENGLISHCALENDAR({
        label: field.fieldControlName,
        value: values?.[field.fieldControlName as string]?.value || "",
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onChange: (engDate, nepDate) => {
          setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: engDate ? formatDate(engDate) : ""})
        }
      })

    case DYNAMICFORMFIELDTYPE.SELECT: {
      const options = field.dropDownResponse?.dropDownDetailResponseDtoList?.map((option: { id: number, descriptionEn: string, descriptionNp: string}) => ({
        label: option.descriptionEn,
        labelNp: option.descriptionNp,
        value: option.id
      }))

      return DynamicFormFieldTypeMapping.SELECT({
        options: options || [],
        value: values.fieldControlName,
        name: field.fieldControlName,
        onChange: (e) => {
          setFieldValue(field?.fieldControlName || "", { fieldId: field?.id, value: e?.main})
        },
        label: field.labelNameEnglish,
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onBlur: handleBlur,
      })
    }

    case DYNAMICFORMFIELDTYPE.INPUT:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.TEXT as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string]?.value || '',
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: e.target.value})
          },
          onBlur: handleBlur,
          isRequired: true,
        }
      )

    case DYNAMICFORMFIELDTYPE.NUMBER:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.NUMBER as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string]?.value || null,
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            debugger
            setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: e.target.value})
          },
          onBlur: handleBlur,
          isRequired: true,
        }
      )

    case DYNAMICFORMFIELDTYPE.RADIO:
      return DynamicFormFieldTypeMapping.RADIO({
        options: field.dropDownResponse?.dropDownDetailResponseDtoList?.map((option: { id: number, descriptionEn: string, descriptionNp: string}) => ({
          label: option.descriptionEn,
          value: option.id
        })) || [],
        label: field.labelNameEnglish,
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onChange: (e) => {
          setFieldValue(field?.fieldControlName || "", {fieldId: field?.id, value: e.target?.value})
        },
        onBlur: handleBlur,
        isRequired: true,
        value: values?.[field.fieldControlName as string]?.value || "" 
      })

      case DYNAMICFORMFIELDTYPE.TEXTAREA:
        return React.createElement<IInputProps>(
          DynamicFormFieldTypeMapping.TEXTAREA as FunctionComponent,
          {
            value: values?.[field.fieldControlName as string]?.value || '',
            label: field.labelNameEnglish,
            id: field.fieldControlName,
            errors: errors,
            touched: touched,
            onChange: (e) => {
              setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: e.target.value})
            },
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
  const initialValues: Record<string, {fieldId: number | string, value: string | number}> = {}
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
    initialValues[field.fieldControlName as string] = {fieldId: field.id, value: field.value}
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
