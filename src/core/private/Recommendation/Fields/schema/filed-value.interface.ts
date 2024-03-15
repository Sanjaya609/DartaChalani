export interface IAddFieldValueInitialValue {
    fieldValueListRequestList: {
          fieldId: number,
          value?: string,
          documentUUIDList?: string[]
    }[],
    formId: number,
    formValueId?: number
}

export interface IAddFieldValuePayload
 extends IAddFieldValueInitialValue {}

export interface IAddFieldValueResponse {
   
 }

 export interface IUpdateFieldValueOrder {
    
 }