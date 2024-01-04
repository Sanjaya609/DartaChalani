import * as Yup from 'yup'
import { IAddGroupInitialValue } from './group.interface'

export const addGroupInitialValues: IAddGroupInitialValue = {
    id: null,
    nameEnglish: "",
    nameNepali: "",
    recommendationId: null,
}

export const addGroupValidationSchema = Yup.object({
    nameEnglish: Yup.string().required(
        'recommendation.errors.recommendationNameEn'
    ),
    nameNepali: Yup.string().required(
        'recommendation.errors.recommendationNameNp'
    ),
})
