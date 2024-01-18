import { FormKeyType } from "@/components/functional/Form/Form";

export interface IAddFieldInitialValue {
    id: number | string;
    dropDownId: string | number;
    dropDownResponse?: { 
        id: number, 
        dropDownDescriptionEn: string, 
        dropDownDescriptionNp: string, 
        dropDownDetailResponseDtoList: {
            id: number, 
            descriptionEn: string, 
            descriptionNp: string
        }[] 
    }
    fieldControlName?: string;
    fieldType: FormKeyType;
    isValidationRequired: boolean;
    orderNo?: number;
    recommendationId: string;
    labelNameEnglish: string;
    labelNameNepali: string;
    className: string;
    groupingId: number | null;
    gridLength: 3 | 4 | 6 | 12 // usecase: col-span-{gridLenght}
}

export interface IAddFieldPayload
 extends IAddFieldInitialValue {}

export interface IAddFieldResponse {
    dropDownId: string | number;
    fieldControlName: string;
    fieldType: FormKeyType;
    id: number;
    isValidationRequired: boolean;
    orderNo?: number
    recommendationId: "";
    labelNameEnglish: string;
    labelNameNepali: string;
    className: string
    groupingId: number | null;
    gridLength: 3 | 4 | 6 | 12
 }

 export interface IUpdateFieldOrder {
    fieldGroupId: number,
    id: number | string,
    orderNo: number
 }