import { Input } from '@/components/functional/Form/Input/Input'
import { Radio } from '@/components/functional/Form/Radio/Radio'
import { EnglishDatePickerInput } from '@/components/functional/Form/DatePicker/EnglishDatePicker/EnglishDatePickerInput'
import { NepaliDatePickerInput } from '@/components/functional/Form/DatePicker/NepaliDatePicker/NepaliDatePickerInput'
import { TextArea } from '@/components/functional/Form/TextArea/TextArea'
import { CheckBox } from '@/components/functional/Form/CheckBox/CheckBox'
import { FormSelect } from '@/components/functional/Form/Select/Select'

const Form = {
  Input,
  Radio,
  EnglishDatePicker: EnglishDatePickerInput,
  NepaliDatePicker: NepaliDatePickerInput,
  TextArea,
  CheckBox,
  Select: FormSelect,
}

export default Form
