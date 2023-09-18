import { RoleSetupFormSchema } from "./roleSetup.interface";
import * as Yup from 'yup'

export const roleSetupIntialValues: RoleSetupFormSchema = {
    roleNameEnglish: "",
    roleNameNepali: "",
    roleType: "",
    description: ""
}


export const roleSetupValidationSchema = Yup.object({
    roleNameEnglish: Yup.string().required('This is required'),
    roleNameNepali: Yup.string().required('This is required'),
    roleType: Yup.string().required(
        'This is required'
    ),
    description: Yup.string().required(
        'This is required'
    ),
})