export interface IAddRecommendationInitialValue {
  id?: number
  recommendationNameEn: string,
  recommendationNameNp: string,
  isActive: boolean
}

export interface IAddRecommendationPayload
  extends Omit<IAddRecommendationInitialValue, 'provinceId' | 'districtId'> {
}

export interface IRecommendationResponse {
  id: number
  recommendationNameEn: string,
  recommendationNameNp: string,
  isActive: boolean
}
