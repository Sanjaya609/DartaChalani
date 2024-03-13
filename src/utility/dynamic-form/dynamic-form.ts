import Form from '@/components/functional/Form/Form'
import { DYNAMICFORMFIELDTYPE } from '../enums/dynamic-form.enum'
import React, { FunctionComponent } from 'react'
import { IInputProps } from '@/components/functional/Form/Input/Input'
import { generateDynamicError } from './generate-dynamic-error'
import { useFormik } from 'formik'
import { StringSchema, ArraySchema, MixedSchema } from 'yup'
import { IAddGroupResponse } from '@/core/private/Recommendation/Fields/schema/group.interface'
import { IAddFieldInitialValue } from '@/core/private/Recommendation/Fields/schema/field.interface'
import formatDate from '../date/dateFunction'

export const DynamicFormFieldTypeMapping = {
  SELECT: Form.Select,
  MULTISELECT: Form.Select,
  TEXT: Form.Input,
  INPUT: Form.Input,
  NUMBER: Form.Input,
  NEPALICALENDAR: Form.NepaliDatePicker,
  ENGLISHCALENDAR: Form.EnglishDatePicker,
  RADIO: Form.Radio,
  CHECKBOX: Form.CheckBox,
  TEXTAREA: Form.TextArea,
  SWITCH: Form.Switch,
  FILE: Form.File
}

export const createFormInputFromFieldType = (
  field: IAddFieldInitialValue,
  formikConfig: ReturnType<typeof useFormik>,
  onHandleChange: (field: IAddFieldInitialValue, value: any) => void
) => {
  const { values, handleChange, handleBlur, errors, setFieldValue, touched } =
    formikConfig

    const options = field.dropDownResponse?.dropDownDetailResponseDtoList?.map((option: { id: number, descriptionEn: string, descriptionNp: string}) => ({
      label: option.descriptionEn,
      labelNp: option.descriptionNp,
      value: option.id?.toString()
    })) || []

  switch (field.fieldType.toUpperCase()) {
    case DYNAMICFORMFIELDTYPE.NEPALICALENDAR:
      return DynamicFormFieldTypeMapping.NEPALICALENDAR({
        label: field.labelNameEnglish,
        value: values?.[field.fieldControlName as string] || "",
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onChange: (engDate, nepDate) => {
          onHandleChange(field, engDate ? formatDate(engDate) : "")
          // setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: nepDate ? formatDate(nepDate) : ""})
        },
        isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0
      })

    case DYNAMICFORMFIELDTYPE.ENGLISHCALENDAR:
      return DynamicFormFieldTypeMapping.ENGLISHCALENDAR({
        label: field.labelNameEnglish,
        value: values?.[field.fieldControlName as string] || "",
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onChange: (engDate, nepDate) => {
          onHandleChange(field, engDate ? formatDate(engDate) : "")
          // setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: engDate ? formatDate(engDate) : ""})
        },
        isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0
      })

    case DYNAMICFORMFIELDTYPE.SELECT: {
      return DynamicFormFieldTypeMapping.SELECT({
        options: options,
        value: values?.[field.fieldControlName as string] || "",
        name: field.fieldControlName,
        onChange: (e) => {
          onHandleChange(field, e?.main)
          // setFieldValue(field?.fieldControlName || "", { fieldId: field?.id, value: e?.main})
        },
        label: field.labelNameEnglish,
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onBlur: handleBlur,
        calculateValueOnChange: true,
        isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0
      })
    }

    case DYNAMICFORMFIELDTYPE.INPUT:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.TEXT as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string] || '',
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            onHandleChange(field, e.target.value)
            // setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: e.target.value})
          },
          onBlur: handleBlur,
          isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0,
        }
      )

      case DYNAMICFORMFIELDTYPE.SWITCH:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.SWITCH as FunctionComponent,
        {
          checked: values?.[field.fieldControlName as string] || false,
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            onHandleChange(field, !values?.[field.fieldControlName as string]?.value)
            // setFieldValue(field?.fieldControlName || "", 
            // {fieldId: field.id, value: !values?.[field.fieldControlName as string]?.value})
          },
          onBlur: handleBlur,
          isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0,
          className: "inline"
        }
      )

    case DYNAMICFORMFIELDTYPE.NUMBER:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.NUMBER as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string] || null,
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            onHandleChange(field, e.target.value)
            // setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: e.target.value})
          },
          onBlur: handleBlur,
          isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0
          ,
        }
      )

    case DYNAMICFORMFIELDTYPE.RADIO:
      return DynamicFormFieldTypeMapping.RADIO({
        options: options,
        label: field.labelNameEnglish,
        id: field.fieldControlName,
        name: field.fieldControlName,
        errors: errors,
        touched: touched,
        onChange: (e) => {
          onHandleChange(field, e.target.value)
          // setFieldValue(field?.fieldControlName || "", {fieldId: field?.id, value: e.target?.value})
        },
        onBlur: handleBlur,
        isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0,
        value: values?.[field.fieldControlName as string] || "" 
      })

    case DYNAMICFORMFIELDTYPE.TEXTAREA:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.TEXTAREA as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string] || '',
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            onHandleChange(field, e.target.value)
            // setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: e.target.value})
          },
          onBlur: handleBlur,
        isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0,
        }
      )

    case DYNAMICFORMFIELDTYPE.CHECKBOX:
      return DynamicFormFieldTypeMapping.CHECKBOX(
        {
          options: options,
          value: values?.[field.fieldControlName as string] || '',
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            // Check if the data is already in the value array
            let valueArray = values?.[field.fieldControlName as string]?.split(',').map(Number) || []
            let index = valueArray?.indexOf(parseInt(e?.target?.value));

            if (index !== -1) {
                // If data is already in value, remove it
                valueArray?.splice(index, 1);
            } else {
                // If data is not in value, insert it
                valueArray.push(e.target.value);
            }

            let updatedValue = valueArray.join(',');
            
            onHandleChange(field, updatedValue)
            // setFieldValue(field?.fieldControlName || "", {fieldId: field?.id, value: updatedValue})
          },
          onBlur: handleBlur,
          isRequired: field?.fieldValidationList?.filter(validation => validation?.validationType === "REQUIRED").length! > 0
        }
      )
    
    case DYNAMICFORMFIELDTYPE.FILE: 
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.FILE as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string]?.value || '',
          label: field.labelNameEnglish,
          onChange: (e) => {
            onHandleChange(field, e.target.value)
          }
        }
      )
  }
}

export const makeFieldsWithSchema = (form: IAddGroupResponse[]) => {
  let validationSchema: Record<
    string,
    MixedSchema<TAny> | ArraySchema<TAny, TAny>
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
    if (field?.fieldValidationList?.length) {
      const schema = generateDynamicError(
        field.fieldType.toUpperCase() as keyof typeof DynamicFormFieldTypeMapping,
        field.fieldValidationList
      )

      validationSchema = {
        ...validationSchema,
        [field.fieldControlName as string]: schema,
      }
    }
  })

  return {
    validationSchema,
    initialValues,
  }
}
