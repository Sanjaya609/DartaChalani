import * as Yup from 'yup'
import { IAddFieldInitialValue } from './field.interface'

export const addFieldInitialValues: IAddFieldInitialValue =

    {
        dropDownId: "",
        // fieldControlName: "Name",
        fieldType: "",
        id: 5,
        isValidationRequired: false,
        // orderNo: "",
        // recommendationId: null,
        labelNameEnglish: "",
        labelNameNepali: "",
        className: "",
        groupingId: ""
    }


export const addFieldValidationSchema = Yup.object({
    // fieldControlName: Yup.string().required(
    //     'recommendation.errors.recommendationNameEn'
    // ),
    fieldType: Yup.string().required(
        'recommendation.errors.recommendationNameNp'
    ),
    // orderNo: Yup.number().required('recommendation.errors.orderNo'),
    labelNameEnglish: Yup.string().required('recommendation.errors.labelNameEnglish'),
    labelNameNepali: Yup.string().required('recommendation.errors.labelNameNepali')
})
