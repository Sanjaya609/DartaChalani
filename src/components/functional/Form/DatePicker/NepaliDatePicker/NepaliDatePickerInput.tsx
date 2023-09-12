import { BSToAD } from '@/components/functional/Datepicker/dateConverter'
import { INepaliDatePicker } from '@/components/functional/Datepicker/datePickerProps'
import NepaliDatepicker from '@/components/functional/Datepicker/NepaliDatepicker'
import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import {
  formCommonInputElementClass,
  formCommonInputWrapperClass,
  formErrorClass,
} from '../../form.classes'
import { FormWrapper } from '../../FormWrapper/FormWrapper'
import { inputWrapperClass } from '../../Input/input.styles'

interface IFormNepaliDatepicker
  extends IBaseFormControlProps,
    INepaliDatePicker {}

function NepaliDatePickerInput(props: IFormNepaliDatepicker) {
  const {
    id = props?.id || props?.name,
    name = props?.name || props?.id,
    errors,
    onChange,
    minDate,
    maxDate,
    canClearDate = true,
    touched,
    errorClassName,
    labelClassName,
    label,
    isFieldArray,
    value,
    disabled,
    maxDateToday,
    minDateToday,
    onSelect,
    datePickerWrapperClassName,
    wrapperClassName,
    className,
    onBlur,
  } = props

  const showError = getErrorStatus({
    name: name || '',
    errors,
    touched,
    isFieldArray,
  })

  const inputWrapperClassName = getComputedClassNames(
    formCommonInputWrapperClass,
    inputWrapperClass,
    datePickerWrapperClassName,
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
      className={wrapperClassName}
    >
      <NepaliDatepicker
        value={value}
        datePickerWrapperClassName={inputWrapperClassName}
        className={computedInputElementClass}
        disabled={disabled}
        onChange={(date) => {
          if (date) {
            onChange?.(date, BSToAD(date))
          } else {
            onChange?.('', null)
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
