import * as Yup from 'yup'
import { IDropdownConfigInitialValue } from './dropdown-config.interface'

export const dropdownConfigInitialValue: IDropdownConfigInitialValue = {
  dropDownDescriptionEn: '',
  dropDownDescriptionNp: '',
  isActive: true,
  listOfDropDownDetailRequestDto: [
    {
      descriptionEn: '',
      descriptionNp: '',
      isActive: true,
    },
  ],
}

export const dropdownConfigSchema = Yup.object({
  dropDownDescriptionEn: Yup.string().required(
    'masterSetup.dropdownConfig.errors.sectorNameEnglish'
  ),
  dropDownDescriptionNp: Yup.string().required(
    'masterSetup.dropdownConfig.errors.sectorNameNepali'
  ),
  listOfDropDownDetailRequestDto: Yup.array()
    .of(
      Yup.object().shape({
        descriptionEn: Yup.string()
          .required(
            'masterSetup.dropdownConfig.errors.resourceRequestList.httpMethod'
          )
          .nullable(),
        descriptionNp: Yup.string()
          .required(
            'masterSetup.dropdownConfig.errors.resourceRequestList.privilege'
          )
          .nullable(),
        field1: Yup.string()
          .required(
            'masterSetup.dropdownConfig.errors.resourceRequestList.resourceName'
          )
          .nullable(),
        field2: Yup.string()
          .required('masterSetup.dropdownConfig.errors.resourceRequestList.url')
          .nullable(),
        field3: Yup.string()
          .required('masterSetup.dropdownConfig.errors.resourceRequestList.url')
          .nullable(),
        field4: Yup.string()
          .required('masterSetup.dropdownConfig.errors.resourceRequestList.url')
          .nullable(),
        value1: Yup.string()
          .required(
            'masterSetup.dropdownConfig.errors.resourceRequestList.resourceName'
          )
          .nullable(),
        value2: Yup.string()
          .required('masterSetup.dropdownConfig.errors.resourceRequestList.url')
          .nullable(),
        value3: Yup.string()
          .required('masterSetup.dropdownConfig.errors.resourceRequestList.url')
          .nullable(),
        value4: Yup.string()
          .required('masterSetup.dropdownConfig.errors.resourceRequestList.url')
          .nullable(),
      })
    )
    .min(1, 'masterSetup.dropdownConfig.errors.atLeastProperties'),
})
