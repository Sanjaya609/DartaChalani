import { Flexbox, Icon } from '@/components/ui'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Calendar } from 'phosphor-react'
import React, { useRef } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  formCommonInputElementClass,
  formCommonInputWrapperClass,
  formErrorClass,
} from '../../form.classes'
import {
  inputRightLeftElementWrapper,
  inputWrapperClass,
} from '../../Input/input.styles'

interface EnglishDatePickerProps extends ReactDatePickerProps {
  label?: string
  name?: string
  className?: string
  removeIconComp?: React.ReactNode
  showError?: boolean
}

const EnglishDatePicker: React.FC<EnglishDatePickerProps> = (props) => {
  const {
    dateFormat = 'yyyy-MM-dd',
    showMonthDropdown = true,
    showYearDropdown = true,
    className,
    removeIconComp,
    showError,
    ...restProps
  } = props
  const computedInputWrapperClass = getComputedClassNames(
    formCommonInputWrapperClass,
    inputWrapperClass,
    {
      [formErrorClass]: showError,
      'bg-gray-92': !!restProps?.disabled || !!restProps?.readOnly,
    }
  )

  const computedInputElementClass = getComputedClassNames(
    formCommonInputElementClass,
    className
  )
  const datePickerRef = useRef<DatePicker>(null)

  return (
    <span className={computedInputWrapperClass}>
      <DatePicker
        {...restProps}
        wrapperClassName="w-full"
        className={computedInputElementClass}
        dateFormat={dateFormat}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        yearDropdownItemNumber={60}
        popperClassName="!z-20"
        ref={datePickerRef}
      />

      <span className={inputRightLeftElementWrapper}>
        <Flexbox align="center">
          {removeIconComp}

          <Icon
            onClick={() => {
              if (!restProps?.disabled && !restProps?.readOnly) {
                datePickerRef?.current?.setOpen(true)
              }
            }}
            size={24}
            icon={Calendar}
            className="cursor-pointer pr-1 text-gray-48"
          />
        </Flexbox>
      </span>
    </span>
  )
}
export default EnglishDatePicker
