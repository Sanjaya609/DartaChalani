import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { convertToNepali } from '@/utility/unicodeMap'
import { forwardRef } from 'react'
import {
  formCommonInputElementClass,
  formCommonInputWrapperClass,
  formErrorClass,
} from '../form.classes'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import {
  inputIconLeftElementWrapper,
  inputRightLeftElementWrapper,
  inputWrapperClass,
} from './input.styles'

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IBaseFormControlProps {
  type?: 'number' | 'email' | 'password' | 'text'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isNepali?: boolean
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const {
    id = props?.id || props?.name,
    name = props?.name || props?.id,
    label,
    type = 'text',
    leftIcon,
    rightIcon,
    errors,
    touched,
    isFieldArray,
    errorClassName,
    labelClassName,
    className,
    wrapperClassName,
    isNepali,
    onChange,
    isRequired,
    showError = true,
    ...rest
  } = props
  const hasErrorMessage = getErrorStatus({
    name: name || '',
    errors,
    touched,
    isFieldArray,
  })
  const computedInputWrapperClass = getComputedClassNames(
    formCommonInputWrapperClass,
    inputWrapperClass,
    {
      [formErrorClass]: hasErrorMessage,
      'bg-gray-92': !!rest?.disabled || !!rest?.readOnly,
    }
  )

  const computedInputElementClass = getComputedClassNames(
    formCommonInputElementClass,
    className
  )

  return (
    <FormWrapper
      touched={touched}
      showError={hasErrorMessage && showError}
      errorClassName={errorClassName}
      errors={errors}
      isFieldArray={isFieldArray}
      name={name}
      labelClassName={labelClassName}
      id={id}
      label={label}
      className={wrapperClassName}
      isRequired={isRequired}
    >
      <span className={computedInputWrapperClass}>
        {leftIcon && (
          <span className={inputIconLeftElementWrapper}>{leftIcon}</span>
        )}

        <input
          {...rest}
          className={computedInputElementClass}
          id={id || name}
          name={name || id}
          ref={ref}
          type={type}
          onChange={(event) => {
            if (onChange) {
              if (isNepali) {
                onChange({
                  ...event,
                  target: {
                    ...event.target,
                    id: id || name || '',
                    name: name || id || '',
                    value: convertToNepali(event.target.value),
                  },
                })
              } else onChange(event)
            }
          }}
        />

        {rightIcon && (
          <span className={inputRightLeftElementWrapper}>{rightIcon}</span>
        )}
      </span>
    </FormWrapper>
  )
})

export { Input }
