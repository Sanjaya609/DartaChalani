import * as Yup from 'yup'
import { IAddRecommendationInitialValue } from './add-recommendation.interface'

export const addRecommendationInitialValues: IAddRecommendationInitialValue =
  {
    nameEnglish: "",
    nameNepali: "",
    description: ""
  }

export const addRecommendationValidationSchema = Yup.object({
  nameEnglish: Yup.string().required(
    'recommendation.errors.recommendationNameEn'
  ),
  nameNepali: Yup.string().required(
    'recommendation.errors.recommendationNameNp'
  ),
  description: Yup.string().required(
    'recommendation.errors.description'
  )
})
