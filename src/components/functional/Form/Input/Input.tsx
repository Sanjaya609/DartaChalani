import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
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
    ...rest
  } = props
  const showError = getErrorStatus({
    name: name || '',
    errors,
    touched,
    isFieldArray,
  })
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
      <span className={computedInputWrapperClass}>
        {leftIcon && (
          <span className={inputIconLeftElementWrapper}>{leftIcon}</span>
        )}

        <input
          className={computedInputElementClass}
          id={id || name}
          name={name || id}
          ref={ref}
          type={type}
          {...rest}
        />

        {rightIcon && (
          <span className={inputRightLeftElementWrapper}>{rightIcon}</span>
        )}
      </span>
    </FormWrapper>
  )
})

export { Input }
