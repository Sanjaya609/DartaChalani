import { Icon } from '@/components/ui'
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
import { inputWrapperClass } from '../../Input/input.styles'

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
        popperClassName="!z-20"
        ref={datePickerRef}
      />
      {removeIconComp}

      <Icon
        onClick={() => {
          datePickerRef?.current?.setOpen(true)
        }}
        size={24}
        icon={Calendar}
        className="cursor-pointer pr-1 text-gray-48"
      />
    </span>
  )
}
export default EnglishDatePicker
