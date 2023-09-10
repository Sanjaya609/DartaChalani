import { Box } from '@/components/ui'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React from 'react'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import { RadioInput } from './RadioInput'

export interface IRadioOptions extends OptionType {}

interface IRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IBaseFormControlProps {
  options: IRadioOptions[]
  radioInputWrapperClassName?: string
  radioLabelClassName?: string
}

const Radio = (props: IRadioProps) => {
  const {
    touched,
    showError,
    errorClassName,
    errors,
    isFieldArray,
    name,
    labelClassName,
    label,
    options,
    radioInputWrapperClassName,
    radioLabelClassName,
    ...restProps
  } = props

  const computedRadioInputWrapperClassName = getComputedClassNames(
    'flex items-center',
    radioInputWrapperClassName
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
      >
        <Box className={computedRadioInputWrapperClassName}>
          {options.map((option, index) => {
            return (
              <RadioInput
                {...restProps}
                name={name}
                className={radioLabelClassName}
                key={`option-${index}`}
                radioInputOption={option}
              />
            )
          })}
        </Box>
      </FormWrapper>
    </>
  )
}

export { Radio }
