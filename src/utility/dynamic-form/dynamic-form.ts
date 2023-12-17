import Form from '@/components/functional/Form/Form'
import { DYNAMICFORMFIELDTYPE } from '../enums/dynamic-form.enum'

export const DynamicFormFieldTypeMapping = {
  SELECT: Form.Select,
  MULTISELECT: Form.Select,
  TEXT: Form.Input,
  NUMBER: Form.Input,
  NEPALICALENDAR: Form.NepaliDatePicker,
  ENGLISHCALENDAR: Form.EnglishDatePicker,
  RADIO: Form.Radio,
  CHECKBOX: Form.CheckBox,
  TEXTAREA: Form.TextArea,
}

export const createFormInputFromFieldType = (form: any) => {
  switch (form.fieldType) {
    case DYNAMICFORMFIELDTYPE.SELECT:
      return DynamicFormFieldTypeMapping.SELECT({
        onChange: () => {
          console.log('test')
        },
        options: [],
        value: '',
        label: form.labelNameEnglish,
      })
  }
}
