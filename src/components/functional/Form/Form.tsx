import { Input } from '@/components/functional/Form/Input/Input'
import { Radio } from '@/components/functional/Form/Radio/Radio'
import { EnglishDatePickerInput } from '@/components/functional/Form/DatePicker/EnglishDatePicker/EnglishDatePickerInput'
import { NepaliDatePickerInput } from '@/components/functional/Form/DatePicker/NepaliDatePicker/NepaliDatePickerInput'
import { TextArea } from '@/components/functional/Form/TextArea/TextArea'
import { CheckBox } from '@/components/functional/Form/CheckBox/CheckBox'
import { FormSelect } from '@/components/functional/Form/Select/Select'
import SwitchInput from './Switch/SwitchInput'
import { UploadSimple } from 'phosphor-react'
import { FileUpload } from './FileUpload/FileUpload'

const Form = {
  Input,
  Radio,
  EnglishDatePicker: EnglishDatePickerInput,
  NepaliDatePicker: NepaliDatePickerInput,
  TextArea,
  CheckBox,
  Select: FormSelect,
  Switch: SwitchInput,
  File: FileUpload,
}

type FormType = typeof Form
export type FormKeyType = keyof FormType

export default Form
