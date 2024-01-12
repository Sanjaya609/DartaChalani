export interface IAddFieldInitialValue {
    id: number;
    dropDownId: string | number;
    fieldControlName?: string;
    fieldType: string;
    isValidationRequired: boolean;
    orderNo?: number;
    recommendationId: string;
    labelNameEnglish: string;
    labelNameNepali: string;
    className: string;
    groupingId: number | null;
    gridLength: 3 | 4 | 6 | 12
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
    recommendationId: "";
    labelNameEnglish: string;
    labelNameNepali: string;
    className: string
    groupingId: number | null;
    gridLength: 3 | 4 | 6 | 12
 }

 export interface IUpdateFieldOrder {
    fieldGroupId: number,
    id: number,
    orderNo: number
 }