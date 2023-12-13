export interface IAddFieldInitialValue {
    id?: string | number;
    dropDownId: string | number;
    fieldControlName: string;
    fieldType: string;
    isValidationRequired: boolean;
    orderNo: string | number;
    recommendationId: string | number;
}

export interface IAddFieldPayload
 extends IAddFieldInitialValue {}

 export interface IAddFieldResponse {
    dropDownId: string | number;
    fieldControlName: string;
    fieldType: string;
    id: string | number;
    isValidationRequired: boolean;
    orderNo: string | number;
    recommendationId: string | number;
 }