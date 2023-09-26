export interface IGenericEnumResWithKeyAndName {
  key: string
  nameNepali: string
  nameEnglish: string
}

export interface IGenericEnumResWithKeyAndValue {
  key: string
  value: string
}

export type IGenericEnumRes =
  | IGenericEnumResWithKeyAndName
  | IGenericEnumResWithKeyAndValue
