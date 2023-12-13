export interface IAddRecommendationInitialValue {
  id?: number
  nameEnglish: string,
  nameNepali: string,
  description: string,
  moduleId: string | number
}

export interface IAddRecommendationPayload
  extends IAddRecommendationInitialValue {
}

export interface IRecommendationResponse {
  id: number
  nameEnglish: string,
  nameNepali: string,
  description: string,
  moduleId: string | number
}