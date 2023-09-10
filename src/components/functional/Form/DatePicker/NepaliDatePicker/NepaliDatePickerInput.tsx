import { BSToAD } from '@/components/functional/Datepicker/dateConverter'
import { INepaliDatePicker } from '@/components/functional/Datepicker/datePickerProps'
import NepaliDatepicker from '@/components/functional/Datepicker/NepaliDatepicker'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import {
  formCommonInputElementClass,
  formCommonInputWrapperClass,
  formErrorClass,
} from '../../form.classes'
import { FormWrapper } from '../../FormWrapper/FormWrapper'
import { inputWrapperClass } from '../../Input/input.styles'

interface IFormEnglishDatepicker
  extends IBaseFormControlProps,
    INepaliDatePicker {}

function NepaliDatePickerInput(props: IFormEnglishDatepicker) {
  const {
    name,
    errors,
    onChange,
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
    disabled,
    maxDateToday,
    minDateToday,
    onSelect,
    wrapperClassName,
    className,
    onBlur,
  } = props

  const inputWrapperClassName = getComputedClassNames(
    formCommonInputWrapperClass,
    inputWrapperClass,
    wrapperClassName,
    'relative',
    {
      [formErrorClass]: showError,
    }
  )

  const computedInputElementClass = getComputedClassNames(
    formCommonInputElementClass,
    className
  )

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
      <NepaliDatepicker
        value={value}
        wrapperClassName={inputWrapperClassName}
        className={computedInputElementClass}
        disabled={disabled}
        onChange={(date) => {
          if (date) {
            onChange?.(date, BSToAD(date))
          }
        }}
        onSelect={onSelect}
        maxDate={maxDate}
        maxDateToday={maxDateToday}
        minDateToday={minDateToday}
        minDate={minDate}
        showError={showError}
        id={id}
        onBlur={onBlur}
        canClearDate={canClearDate}
      />
    </FormWrapper>
  )
}

export { NepaliDatePickerInput }
