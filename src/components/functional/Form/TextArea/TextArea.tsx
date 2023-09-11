import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { forwardRef } from 'react'
import { formErrorClass } from '../form.classes'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import { textAreaInputClass } from './textarea.styles'

interface IInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement>,
    IBaseFormControlProps {}

const TextArea = forwardRef<HTMLTextAreaElement, IInputProps>((props, ref) => {
  const {
    id = props?.id || props?.name,
    name = props?.name || props?.id,
    label,
    type = 'text',
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
  const computedClassName = getComputedClassNames(
    textAreaInputClass,
    className,
    {
      [formErrorClass]: showError,
    }
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
      <textarea
        className={computedClassName}
        id={id || name}
        name={name || id}
        ref={ref}
        {...rest}
      />
    </FormWrapper>
  )
})

export { TextArea }
