import { Box } from '@/components/ui'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React from 'react'
import { formLabelClassName } from '../form.classes'
import { ICheckBoxOptions } from './CheckBox'

interface ICheckBoxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checkBoxInputOption: ICheckBoxOptions
  className?: string
}

const CheckBoxInput = (props: ICheckBoxInputProps) => {
  const {
    checkBoxInputOption: { label, value, labelNp },
    value: selectedValue,
    name,
    className,
    ...restProps
  } = props

  const computedLabelClass = getComputedClassNames(
    formLabelClassName,
    'ml-2',
    className
  )

  return (
    <Box className="flex items-center pr-4 last:pr-0">
      <input
        {...restProps}
        type="checkbox"
        value={value}
        checked={
          selectedValue && selectedValue instanceof Array
            ? selectedValue.includes(value)
            : selectedValue === value
        }
        id={`${name}-${value}`}
      />
      <label className={computedLabelClass} htmlFor={`${name}-${value}`}>
        {getTextByLanguage(label, labelNp || label)}
      </label>
    </Box>
  )
}

export default CheckBoxInput
