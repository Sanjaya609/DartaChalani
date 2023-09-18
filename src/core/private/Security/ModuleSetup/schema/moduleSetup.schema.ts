import * as Yup from 'yup';
import { ModuleSetupFormSchema } from "./moduleSetup.interface";

export const moduleSetupInitialValues: ModuleSetupFormSchema = {
    code: "",
    description: "",
    iconClass: "",
    isConfigurable: true,
    moduleNameEnglish: "",
    moduleNameNepali: "",
    orderNumber: 0,
    parentModuleId: 0,
    resourceIds: [],
    url: ""
}


export const moduleSetupValidationSchema = Yup.object().shape({
    code: Yup.string().required('Code is required'),
    description: Yup.string().required('Description is required'),
    iconClass: Yup.string().required('Icon Class is required'),
    isConfigurable: Yup.boolean().required('Configurability is required'),
    moduleNameEnglish: Yup.string().required('Module Name (English) is required'),
    moduleNameNepali: Yup.string().required('Module Name (Nepali) is required'),
    orderNumber: Yup.number().required('Order Number is required').min(1, 'Order Number must be greater than 0'),
    parentModuleId: Yup.number().required('Parent Module ID is required'),
    resourceIds: Yup.array().of(Yup.number()).required('Resource IDs are required'),
    url: Yup.string().required('URL is required'),
});