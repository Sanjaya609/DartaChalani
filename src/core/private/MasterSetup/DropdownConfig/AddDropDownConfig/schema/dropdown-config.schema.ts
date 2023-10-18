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
    fieldValues?: { field: string; value: string }[]
    dropDownId?: number
    id?: number
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
        fieldValues: Yup.array().of(
          Yup.object().shape({
            field: Yup.string()
              .required(
                'masterSetup.dropdownConfig.errors.resourceRequestList.httpMethod'
              )
              .nullable(),
            value: Yup.string()
              .required(
                'masterSetup.dropdownConfig.errors.resourceRequestList.privilege'
              )
              .nullable(),
          })
        ),
      })
    )
    .min(1, 'masterSetup.dropdownConfig.errors.atLeastProperties'),
})
