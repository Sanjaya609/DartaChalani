import { Box } from '@/components/ui'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React from 'react'
import { formLabelClassName } from '../form.classes'
import { IRadioOptions } from './Radio'

interface IRadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  radioInputOption: IRadioOptions
  className?: string
}

const RadioInput = (props: IRadioInputProps) => {
  const {
    radioInputOption: { label, value, labelNp },
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
        type="radio"
        value={value}
        checked={value === selectedValue}
        id={`${name}-${value}`}
      />
      <label className={computedLabelClass} htmlFor={`${name}-${value}`}>
        {getTextByLanguage(label, labelNp || label)}
      </label>
    </Box>
  )
}

export { RadioInput }
