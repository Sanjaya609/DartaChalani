export interface IAddFieldInitialValue {
    id: number;
    dropDownId: string | number;
    fieldControlName?: string;
    fieldType: string;
    isValidationRequired: boolean;
    // orderNo: string | number;
    // recommendationId: null | number;
    labelNameEnglish: string;
    labelNameNepali: string;
    className: string;
    groupingId: number | null;
}

export interface IAddFieldPayload
 extends IAddFieldInitialValue {}

 export interface IAddFieldResponse {
    dropDownId: string | number;
    fieldControlName: string;
    fieldType: string;
    id: number;
    isValidationRequired: boolean;
    // orderNo: string | number;
    // recommendationId: null | number;
    labelNameEnglish: string;
    labelNameNepali: string;
    className: string
    groupingId: number | null;
 }