import * as Yup from 'yup'
import { IValidationsFormSchema } from './validations.interface'

export const validationSetupInitialValues: IValidationsFormSchema = {
    errorMessage: "Please enter a value",
    fieldId: 0,
    id: 0,
    regex: "",
    validationType: "NOT_NULL"
}

export const ValidationSetupValidationSchema = Yup.object().shape({
    errorMessage: Yup.string().required('security.module.errors.code'),
    fieldId: Yup.string().required('security.module.errors.description'),
    validationType: Yup.string().required(
        'security.module.errors.moduleNameEnglish'
    ),
})