import * as Yup from 'yup'
import { IAddFieldInitialValue } from './field.interface'

export const addFieldInitialValues: IAddFieldInitialValue =
{
    dropDownId: "",
    fieldControlName: "",
    fieldType: "",
    id: "",
    isValidationRequired: false,
    orderNo: "",
    recommendationId: ""
}

export const addFieldValidationSchema = Yup.object({
    fieldControlName: Yup.string().required(
        'recommendation.errors.recommendationNameEn'
    ),
    fieldType: Yup.string().required(
        'recommendation.errors.recommendationNameNp'
    ),
})
