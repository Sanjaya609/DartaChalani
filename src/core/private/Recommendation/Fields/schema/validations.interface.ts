  export interface IValidationsFormSchema {
    id?: number,
    errorMessage: string,
    fieldId: StringNumber,
    // regex: string,
    validationType: string,
    value: string
  }