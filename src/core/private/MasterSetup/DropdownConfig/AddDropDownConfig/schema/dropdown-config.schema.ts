import * as Yup from 'yup'

export interface IDropdownFieldConfigInitialValue {
  id?: number
  dropDownDescriptionEn: string
  dropDownDescriptionNp: string
  isActive: boolean
  listOfDropDownDetailRequestDto: {
    descriptionEn: string
    descriptionNp: string
    isActive: boolean
    dropDownId?: number
    id?: number
    fieldValues?: { field: string; value: string }[]
  }[]
}

export const dropdownConfigInitialValue: IDropdownFieldConfigInitialValue = {
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
    'masterSetup.dropdownConfig.errors.dropDownDescriptionEn'
  ),
  dropDownDescriptionNp: Yup.string().required(
    'masterSetup.dropdownConfig.errors.dropDownDescriptionEn'
  ),
  listOfDropDownDetailRequestDto: Yup.array()
    .of(
      Yup.object().shape({
        descriptionEn: Yup.string()
          .required('masterSetup.dropdownConfig.errors.descriptionEn')
          .nullable(),
        descriptionNp: Yup.string()
          .required('masterSetup.dropdownConfig.errors.descriptionNp')
          .nullable(),
        fieldValues: Yup.array().of(
          Yup.object().shape({
            field: Yup.string()
              .required('masterSetup.dropdownConfig.errors.field')
              .nullable(),
            value: Yup.string()
              .required('masterSetup.dropdownConfig.errors.field')
              .nullable(),
          })
        ),
      })
    )
    .min(1, 'masterSetup.dropdownConfig.errors.atLeastProperties'),
})
