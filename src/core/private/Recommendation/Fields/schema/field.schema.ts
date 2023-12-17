import * as Yup from 'yup'
import { IAddFieldInitialValue } from './field.interface'

export const addFieldInitialValues: IAddFieldInitialValue[] =
[
    {
        dropDownId: "",
        fieldControlName: "Name",
        fieldType: "",
        id: 5,
        isValidationRequired: false,
        orderNo: "",
        recommendationId: "",
        lableNameEnglish: "",
        lableNameNepali: "",
        className: ""
    },
    {
        dropDownId: "",
        fieldControlName: "Gender",
        fieldType: "",
        id: 1,
        isValidationRequired: false,
        orderNo: "",
        recommendationId: "",
        lableNameEnglish: "",
        lableNameNepali: "",
        className: ""
    },
    {
        dropDownId: "",
        fieldControlName: "Test",
        fieldType: "",
        id: 2,
        isValidationRequired: false,
        orderNo: "",
        recommendationId: "",
        lableNameEnglish: "",
        lableNameNepali: "",
        className: ""
    }
]

export const addFieldValidationSchema = Yup.object({
    fieldControlName: Yup.string().required(
        'recommendation.errors.recommendationNameEn'
    ),
    fieldType: Yup.string().required(
        'recommendation.errors.recommendationNameNp'
    ),
    orderNo: Yup.number().required('recommendation.errors.orderNo'),
    lableNameEnglish: Yup.string().required('recommendation.errors.lableNameEnglish'),
    lableNameNepali: Yup.string().required('recommendation.errors.lableNameNepali')
})
