import * as Yup from 'yup'
import { DynamicFormFieldTypeMapping } from './dynamic-form'

interface IFieldValidationList {
  id: number
  fieldId: number
  validationType: string
  errorMessage: string
  regex: null
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
  }
  let error = getYupType[fieldType]

  const getValidationSchema = (validation: IFieldValidationList) => {
    switch (validation.validationType) {
      case 'NOT_NULL':
        error = error?.required(validation.errorMessage)
        return

      case 'MAX_LENGTH':
        error = error?.max(10, validation.errorMessage)
        return
    }
  }

  validations.forEach((validation) => getValidationSchema(validation))

  return error as Yup.StringSchema<TAny> | Yup.ArraySchema<TAny, TAny>
}