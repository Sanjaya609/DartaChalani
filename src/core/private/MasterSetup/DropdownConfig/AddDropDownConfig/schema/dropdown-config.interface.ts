export interface IDropdownConfigInitialValue {
  dropDownDescriptionEn: string
  dropDownDescriptionNp: string
  id?: number
  isActive: boolean
  listOfDropDownDetailRequestDto: IListOfDropDownDetailRequestDto[]
}

interface IListOfDropDownDetailRequestDto {
  descriptionEn: string
  descriptionNp: string
  dropDownId?: number
  field1: string
  field2: string
  field3: string
  field4: string
  id?: number
  isActive: boolean
  value1: string
  value2: string
  value3: string
  value4: string
}

export interface IDropdownConfigResponse {
  dropDownDescriptionEn: string
  dropDownDescriptionNp: string
  id: number
  isActive: boolean
  listOfDropDownDetailRequestDto: IListOfDropDownDetailRequestDto[]
}
