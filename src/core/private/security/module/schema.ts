import * as yup from 'yup';
import { OptionType } from '../../../../components/StyledSelect/StyledSelect';
import { ResourseSchema } from '../resource/schema';

export interface ModuleSchema {
    code: string,
    description: string,
    iconClass: string,
    id?: number,
    isConfigurable: boolean,
    moduleNameEnglish: string,
    moduleNameNepali: string,
    parentModuleId?: number | null,
    resourceIds: number[],
    url: string
}

export interface ModuleSchemaData {
    code: string,
    description: string,
    iconClass: string,
    id?: number,
    isConfigurable: boolean,
    moduleNameEnglish: string,
    moduleNameNepali: string,
    parentModuleId?: OptionType,
    resourceIds: OptionType[],
    url: string
    orderNumber: number | string | null

}

export interface ModuleSchemaResponse {
    id: number
    moduleNameEnglish: string
    moduleNameNepali: string
    code: string
    description: string
    url: string
    iconClass: string
    isConfigurable: boolean
    parentModuleId: number
    parentModuleNameEnglish: string
    parentModuleNameNepali: string
    isActive: boolean
    resourceResponses: ResourseSchema[]
    orderNumber: number
}

export const moduleIntialValue: ModuleSchemaData = {
    code: '',
    description: '',
    iconClass: '',
    isConfigurable: false,
    moduleNameEnglish: '',
    moduleNameNepali: '',
    resourceIds: [],
    url: '',
    orderNumber: null
}

export const moduleValidationSchema = yup.object({
    code: yup.string().required('requiredField'),
    description: yup.string().required('requiredField'),
    iconClass: yup.string().required('requiredField'),
    isConfigurable: yup.boolean().required('requiredField'),
    moduleNameEnglish: yup.string().required('requiredField'),
    moduleNameNepali: yup.string().required('requiredField'),
    // resourceIds: yup.mixed().required(),
    url: yup.string().required('requiredField').matches(/^\//, 'urlValidation'),
    orderNumber: yup.number().required('requiredField').min(1, "minOneValidation"),
})