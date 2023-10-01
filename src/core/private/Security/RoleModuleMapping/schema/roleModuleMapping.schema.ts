import { RoleSetupFormSchema } from './roleModuleMapping.interface'
import * as Yup from 'yup'

export const roleSetupIntialValues: RoleSetupFormSchema = {
  roleNameEnglish: '',
  roleNameNepali: '',
  roleType: '',
  description: '',
}

export const roleSetupValidationSchema = Yup.object({
  roleNameEnglish: Yup.string().required(
    'security.roleSetup.errors.roleNameEnglish'
  ),
  roleNameNepali: Yup.string().required(
    'security.roleSetup.errors.roleNameNepali'
  ),
  roleType: Yup.string().required('security.roleSetup.errors.roleType'),
  description: Yup.string().required('security.roleSetup.errors.description'),
})
