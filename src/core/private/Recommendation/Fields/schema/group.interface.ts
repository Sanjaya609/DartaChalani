import { IAddFieldInitialValue } from "./field.interface";

export interface IAddGroupInitialValue {
    id?: number | null | string;
    nameEnglish: string;
    nameNepali: string;
    recommendationId: string;
    showInForm: boolean;
}

export interface IAddGroupPayload
 extends IAddGroupInitialValue {}

 export interface IAddGroupResponse {
    id: number;
    nameEnglish: string;
    nameNepali: string;
    recommendationId: string;
    fieldResponseList?: IAddFieldInitialValue[]
    showInForm: boolean
 }