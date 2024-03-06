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
  SWITCH: Form.Switch,
  FILE: Form.File
}

export const createFormInputFromFieldType = (
  field: IAddFieldInitialValue,
  formikConfig: ReturnType<typeof useFormik>
) => {
  const { values, handleChange, handleBlur, errors, setFieldValue, touched } =
    formikConfig

    const options = field.dropDownResponse?.dropDownDetailResponseDtoList?.map((option: { id: number, descriptionEn: string, descriptionNp: string}) => ({
      label: option.descriptionEn,
      labelNp: option.descriptionNp,
      value: option.id
    })) || []

  switch (field.fieldType.toUpperCase()) {
    case DYNAMICFORMFIELDTYPE.NEPALICALENDAR:
      return DynamicFormFieldTypeMapping.NEPALICALENDAR({
        label: field.labelNameEnglish,
        value: values?.[field.fieldControlName as string]?.value || "",
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onChange: (engDate, nepDate) => {
          setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: nepDate ? formatDate(nepDate) : ""})
        }
      })

    case DYNAMICFORMFIELDTYPE.ENGLISHCALENDAR:
      return DynamicFormFieldTypeMapping.ENGLISHCALENDAR({
        label: field.labelNameEnglish,
        value: values?.[field.fieldControlName as string]?.value || "",
        id: field.fieldControlName,
        errors: errors,
        touched: touched,
        onChange: (engDate, nepDate) => {
          setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: engDate ? formatDate(engDate) : ""})
        }
      })

    // case DYNAMICFORMFIELDTYPE.CHECKBOX:
    case DYNAMICFORMFIELDTYPE.SELECT: {
      return DynamicFormFieldTypeMapping.SELECT({
        // multi: field.fieldType.toUpperCase() === DYNAMICFORMFIELDTYPE.CHECKBOX,
        options: options,
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

      case DYNAMICFORMFIELDTYPE.SWITCH:
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.SWITCH as FunctionComponent,
        {
          checked: values?.[field.fieldControlName as string]?.value || false,
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            setFieldValue(field?.fieldControlName || "", 
            {fieldId: field.id, value: !values?.[field.fieldControlName as string]?.value})
          },
          onBlur: handleBlur,
          isRequired: true,
          className: "inline"
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
            setFieldValue(field?.fieldControlName || "", {fieldId: field.id, value: e.target.value})
          },
          onBlur: handleBlur,
          isRequired: true,
        }
      )

    case DYNAMICFORMFIELDTYPE.RADIO:
      return DynamicFormFieldTypeMapping.RADIO({
        options: options,
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

    case DYNAMICFORMFIELDTYPE.CHECKBOX:
      return DynamicFormFieldTypeMapping.CHECKBOX(
        {
          options: options,
          value: values?.[field.fieldControlName as string]?.value || '',
          label: field.labelNameEnglish,
          id: field.fieldControlName,
          errors: errors,
          touched: touched,
          onChange: (e) => {
            // Check if the data is already in the value array
            let valueArray = values?.[field.fieldControlName as string]?.value?.split(',').map(Number) || []
            let index = valueArray?.indexOf(parseInt(e?.target?.value));

            if (index !== -1) {
                // If data is already in value, remove it
                valueArray?.splice(index, 1);
            } else {
                // If data is not in value, insert it
                valueArray.push(e.target.value);
            }

            let updatedValue = valueArray.join(',');
            
            setFieldValue(field?.fieldControlName || "", {fieldId: field?.id, value: updatedValue})
          },
          onBlur: handleBlur,
          isRequired: true,
        }
      )
    
    case DYNAMICFORMFIELDTYPE.FILE: 
      return React.createElement<IInputProps>(
        DynamicFormFieldTypeMapping.FILE as FunctionComponent,
        {
          value: values?.[field.fieldControlName as string]?.value || '',
          label: field.labelNameEnglish,
          onChange: (e) => {
          }
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
