import * as Yup from 'yup'
import { DynamicFormFieldTypeMapping } from './dynamic-form'

interface IFieldValidationList {
  id: number
  fieldId: number
  validationType: string
  errorMessage: string
  // regex: string
  value?: number | string
}

export const generateDynamicError = (
  fieldType: keyof typeof DynamicFormFieldTypeMapping,
  validations: IFieldValidationList[]
) => {
  const getYupType: Partial<
    Record<
      keyof typeof DynamicFormFieldTypeMapping,
      Yup.StringSchema<TAny> | Yup.ArraySchema<TAny, TAny>
    >
  > = {
    SELECT: Yup.string().nullable(),
    TEXT: Yup.string().nullable(),
    INPUT: Yup.string().nullable(),
    RADIO: Yup.string().nullable(),
    ENGLISHDATEPICKER: Yup.string().nullable(),
    NEPALIDATEPICKER: Yup.string().nullable()
  }
  let error = getYupType[fieldType]

  const getValidationSchema = (validation: IFieldValidationList) => {
    switch (validation.validationType) {
      case 'REQUIRED':
      case 'NOT_NULL':
          error = error?.required(validation.errorMessage)
          return

      case 'MAX':
        error = error?.max(parseInt(validation?.value?.toString()!), validation.errorMessage)
        return

      case 'MIN':
        error = error?.min(parseInt(validation?.value?.toString()!), validation.errorMessage)
        return
    }
  }

  validations.forEach((validation) => getValidationSchema(validation))

  return error as Yup.StringSchema<TAny> | Yup.ArraySchema<TAny, TAny>
  debugger
}
