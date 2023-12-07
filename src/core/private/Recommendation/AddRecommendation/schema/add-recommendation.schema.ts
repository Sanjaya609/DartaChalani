import * as Yup from 'yup'
import { IAddRecommendationInitialValue } from './add-recommendation.interface'

export const addRecommendationInitialValues: IAddRecommendationInitialValue =
  {
    recommendationNameEn: "",
    recommendationNameNp: "",
    isActive: false
  }

export const addRecommendationValidationSchema = Yup.object({
  recommendationNameEn: Yup.string().required(
    'recommendation.errors.recommendationNameEn'
  ),
  recommendationNameNp: Yup.string().required(
    'recommendation.errors.recommendationNameNp'
  ),
})
