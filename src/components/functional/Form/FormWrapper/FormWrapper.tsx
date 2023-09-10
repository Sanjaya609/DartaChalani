import {
  FormikFieldArrayValidationError,
  FormikValidationError,
} from '../InputErrorMessage/InputErrorMessage'
import { Label } from '../Label/Label'

interface IFormWrapperProps
  extends React.PropsWithChildren,
    IBaseFormControlProps {}

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
  } = props
  return (
    <>
      <Label id={id} className={labelClassName} label={label} />
      {children}
      {showError && name ? (
        isFieldArray ? (
          <FormikFieldArrayValidationError
            name={name}
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
    </>
  )
}

export { FormWrapper }
