import * as Yup from 'yup'
import { IModuleSetupFormSchema } from './moduleSetup.interface'
import { RequestMethod } from '@/lib/api-request'

export const moduleSetupInitialValues: IModuleSetupFormSchema = {
  code: '',
  description: '',
  iconClass: '',
  isConfigurable: false,
  moduleNameEnglish: '',
  moduleNameNepali: '',
  orderNumber: '',
  parentModuleId: 0,
  resourceRequestList: [
    {
      httpMethod: '',
      privilege: '',
      resourceName: '',
      url: '',
    },
  ],
  url: '',
}

export const moduleSetupValidationSchema = Yup.object().shape({
  code: Yup.string().required('security.module.errors.code'),
  description: Yup.string().required('security.module.errors.description'),
  moduleNameEnglish: Yup.string().required(
    'security.module.errors.moduleNameEnglish'
  ),
  moduleNameNepali: Yup.string().required(
    'security.module.errors.moduleNameNepali'
  ),
  orderNumber: Yup.string().required('security.module.errors.orderNumber'),

  url: Yup.string().required('security.module.errors.url'),
  resourceRequestList: Yup.array().when('isConfigurable', {
    is: true,
    then: () =>
      Yup.array()
        .of(
          Yup.object().shape({
            httpMethod: Yup.string()
              .required('security.module.errors.resourceRequestList.httpMethod')
              .nullable(),
            privilege: Yup.string()
              .required('security.module.errors.resourceRequestList.privilege')
              .nullable(),
            resourceName: Yup.string()
              .required(
                'security.module.errors.resourceRequestList.resourceName'
              )
              .nullable(),
            url: Yup.string()
              .required('security.module.errors.resourceRequestList.url')
              .nullable(),
          })
        )

        .min(1, 'security.module.errors.atLeastProperties'),
    // .uniqueProperty(
    //   'security.module.errors.duplicateKey',
    //   (a: { key: string }) => a.key
    // ),
  }),
  // otherwise: Yup.array,
})

export const HTTPMethodOption = [
  {
    label: RequestMethod.GET,
    value: RequestMethod.GET,
  },
  {
    label: RequestMethod.POST,
    value: RequestMethod.POST,
  },
  {
    label: RequestMethod.PUT,
    value: RequestMethod.PUT,
  },
  {
    label: RequestMethod.DELETE,
    value: RequestMethod.DELETE,
  },
  {
    label: RequestMethod.PATCH,
    value: RequestMethod.PATCH,
  },
]
