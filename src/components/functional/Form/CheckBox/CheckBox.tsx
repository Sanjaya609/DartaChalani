import { Box } from '@/components/ui'
import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React from 'react'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import CheckBoxInput from './CheckBoxInput'

export interface ICheckBoxOptions extends OptionType {}

interface ICheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IBaseFormControlProps {
  options: ICheckBoxOptions[]
  checkBoxInputWrapperClassName?: string
  checkBoxLabelClassName?: string
}

const CheckBox = (props: ICheckBoxProps) => {
  const {
    touched,
    errorClassName,
    errors,
    isFieldArray,
    name,
    labelClassName,
    label,
    options,
    checkBoxInputWrapperClassName,
    checkBoxLabelClassName,
    wrapperClassName,
    isRequired,
    ...restProps
  } = props

  const showError = getErrorStatus({
    name: name || '',
    errors,
    touched,
    isFieldArray,
  })

  const computedCheckBoxInputWrapperClassName = getComputedClassNames(
    'flex items-center',
    checkBoxInputWrapperClassName
  )

  return (
    <>
      <FormWrapper
        touched={touched}
        showError={showError}
        errorClassName={errorClassName}
        errors={errors}
        isFieldArray={isFieldArray}
        name={name}
        labelClassName={labelClassName}
        label={label}
        className={wrapperClassName}
        isRequired={isRequired}
      >
        <Box className={computedCheckBoxInputWrapperClassName}>
          {options.map((option, index) => {
            return (
              <CheckBoxInput
                {...restProps}
                name={name}
                className={checkBoxLabelClassName}
                key={`option-${index}`}
                checkBoxInputOption={option}
              />
            )
          })}
        </Box>
      </FormWrapper>
    </>
  )
}

export { CheckBox }
