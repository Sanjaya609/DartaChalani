import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import {
  FormikFieldArrayValidationError,
  FormikValidationError,
} from '../InputErrorMessage/InputErrorMessage'
import { Label } from '../Label/Label'

interface IFormWrapperProps
  extends React.PropsWithChildren,
    Omit<IBaseFormControlProps, 'wrapperClassName'> {
  className?: string
  showError?: boolean
}

const FormWrapper = (props: IFormWrapperProps) => {
  const {
    id,
    labelClassName,
    label,
    children,
    name,
    showError,
    isFieldArray,
    errors,
    errorClassName,
    touched,
    className,
    isRequired,
  } = props

  const computedClassName = getComputedClassNames(className)

  return (
    <div className={computedClassName}>
      <Label
        id={id}
        className={labelClassName}
        label={label}
        isRequired={isRequired}
      />
      {children}
      {showError && name ? (
        isFieldArray ? (
          <FormikFieldArrayValidationError
            name={isFieldArray?.name}
            touched={touched}
            errors={errors}
            className={errorClassName}
            keyName={isFieldArray.keyName}
            index={isFieldArray.index}
          />
        ) : (
          <FormikValidationError
            name={name}
            errors={errors}
            touched={touched}
            className={errorClassName}
          />
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export { FormWrapper }
