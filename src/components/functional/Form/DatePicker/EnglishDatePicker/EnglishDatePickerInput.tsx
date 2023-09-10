import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import { Icon } from '@/components/ui'
import { X } from 'phosphor-react'
import { FormWrapper } from '../../FormWrapper/FormWrapper'
import EnglishDatePicker from './EnglishDatePicker'

interface IFormEnglishDatepicker extends IBaseFormControlProps {
  onChange?: (engDate?: Date | string, nepdate?: string) => void
  readOnly?: boolean
  disabled?: boolean
  minDate?: string | Date
  maxDate?: string | Date
  canClearDate?: boolean
  value?: string
}

function EnglishDatePickerInput(props: IFormEnglishDatepicker) {
  const {
    name,
    errors,
    onChange,
    readOnly = false,
    minDate,
    maxDate,
    canClearDate = false,
    touched,
    errorClassName,
    labelClassName,
    label,
    id,
    showError,
    isFieldArray,
    value,
  } = props

  return (
    <FormWrapper
      touched={touched}
      showError={showError}
      errorClassName={errorClassName}
      errors={errors}
      isFieldArray={isFieldArray}
      name={name}
      labelClassName={labelClassName}
      id={id}
      label={label}
    >
      <EnglishDatePicker
        value={value}
        showError={showError}
        minDate={minDate ? new Date(minDate) : undefined}
        maxDate={maxDate ? new Date(maxDate) : undefined}
        readOnly={readOnly}
        autoComplete={'off'}
        onChangeRaw={(e) => e.preventDefault()} // Disables input
        onChange={(date) => {
          if (date) {
            onChange?.(date, ADToBS(date))
          }
        }}
        scrollableYearDropdown
        removeIconComp={
          canClearDate &&
          !!value && (
            <Icon
              onClick={(event) => {
                event.stopPropagation()
                onChange?.('', '')
              }}
              icon={X}
              size="sm"
              role="button"
              type="button"
              className="mr-2 text-gray-48"
            />
          )
        }
      />
    </FormWrapper>
  )
}

export { EnglishDatePickerInput }
