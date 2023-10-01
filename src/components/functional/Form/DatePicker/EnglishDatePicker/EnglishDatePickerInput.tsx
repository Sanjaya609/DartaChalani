import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import { Icon } from '@/components/ui'
import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { X } from 'phosphor-react'
import { ReactDatePickerProps } from 'react-datepicker'
import { FormWrapper } from '../../FormWrapper/FormWrapper'
import EnglishDatePicker from './EnglishDatePicker'

interface IFormEnglishDatepicker
  extends IBaseFormControlProps,
    Omit<ReactDatePickerProps, 'minDate' | 'maxDate' | 'onChange'> {
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
    id = props?.id || props?.name,
    name = props?.name || props?.id,
    errors,
    onChange,
    readOnly = false,
    minDate,
    maxDate,
    canClearDate = true,
    touched,
    errorClassName,
    labelClassName,
    label,
    isFieldArray,
    value,
    wrapperClassName,
    ...datePickerProps
  } = props

  const showError = getErrorStatus({
    name: name || '',
    errors,
    touched,
    isFieldArray,
  })

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
      <EnglishDatePicker
        {...datePickerProps}
        id={id}
        name={id}
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
          !!value &&
          !datePickerProps?.disabled &&
          !readOnly && (
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
