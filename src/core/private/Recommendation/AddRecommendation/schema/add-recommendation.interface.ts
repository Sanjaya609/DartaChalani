export interface IAddRecommendationInitialValue {
  id?: number
  nameEnglish: string,
  nameNepali: string,
  description: string
}

export interface IAddRecommendationPayload
  extends Omit<IAddRecommendationInitialValue, 'provinceId' | 'districtId'> {
}

export interface IRecommendationResponse {
  id: number
  nameEnglish: string,
  nameNepali: string,
  description: string
}
