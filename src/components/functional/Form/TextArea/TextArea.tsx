import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { forwardRef } from 'react'
import { formErrorClass } from '../form.classes'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import { textAreaInputClass } from './textarea.styles'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { convertEngToNepNumber } from '../../Datepicker/datePickerUtils'

interface IInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement>,
    IBaseFormControlProps {
  withCharacterCount?: boolean
}

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
    isRequired,
    withCharacterCount,
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
      isRequired={isRequired}
    >
      <textarea
        className={computedClassName}
        id={id || name}
        name={name || id}
        ref={ref}
        {...rest}
      />
      {withCharacterCount && rest.maxLength && (
        <span className="mt-2 block w-full text-right font-medium text-navy-24">
          {getTextByLanguage(
            `${rest.maxLength - (rest?.value ? String(rest.value).length : 0)}
          characters left`,
            ` ${convertEngToNepNumber(
              rest.maxLength - (rest?.value ? String(rest.value).length : 0)
            )}
            अक्षर बाँकी`
          )}
        </span>
      )}
    </FormWrapper>
  )
})

export { TextArea }
