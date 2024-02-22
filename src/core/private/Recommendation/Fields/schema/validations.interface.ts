export interface IResourceRequestList {
    httpMethod: string
    id?: number
    isActive?: boolean
    privilege: string
    resourceName: string
    url: string
    isAssignedToRole?: boolean
  }
  
  export interface IValidationsFormSchema {
    id?: number,
    errorMessage: string,
    fieldId: StringNumber,
    regex: string,
    validationType: string
  }
  