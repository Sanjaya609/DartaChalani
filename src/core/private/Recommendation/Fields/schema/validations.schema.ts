import * as Yup from 'yup'
import { IValidationsFormSchema } from './validations.interface'

export const valueRequiringValidationType = [
    "MIN",
    "MAX",
]

export const validationSetupInitialValues: IValidationsFormSchema = {
    errorMessage: "",
    fieldId: 0,
    id: 0,
    // regex: "",
    validationType: "",
    value: ""
}

export const ValidationSetupValidationSchema = Yup.object().shape({
    errorMessage: Yup.string().required('Error message is required'),
    fieldId: Yup.string().required('security.module.errors.description'),
    validationType: Yup.string().required(
        'Validation Type is required'
    ),
    value: Yup.string().when('validationType', {
        is: (val: string) => {
            return !valueRequiringValidationType.includes(val)
        },
        then: () => Yup.string().nullable(),
        otherwise: () =>
          Yup.string().required('Value is Required'),
      }),
})