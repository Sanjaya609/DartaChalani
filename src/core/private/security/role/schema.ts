import { OptionType } from "../../../../components/StyledSelect/StyledSelect";
import * as yup from 'yup';

export interface RoleData {
    id?: number,
    roleNameEnglish: string,
    roleNameNepali: string,
    description: string,
    isActive: boolean,
    roleType: string
}
export interface RoleDataPayload {
    id?: number,
    roleNameEnglish: string,
    roleNameNepali: string,
    description: string,
    isActive: boolean,
    roleType: OptionType | null
}
export const roleIntialValue: RoleDataPayload = {
    roleNameEnglish: '',
    roleNameNepali: '',
    description: '',
    isActive: true,
    roleType: null
}

export const roelValidationSchema = yup.object({
    roleNameEnglish: yup.string().required('requiredField'),
    roleNameNepali: yup.string().required('requiredField'),
    roleType: yup.mixed().required('requiredField')
})