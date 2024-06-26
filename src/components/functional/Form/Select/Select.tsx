import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { Select } from '../../Select'
import { StyledSelectProps } from '../../Select/Select'
import { FormWrapper } from '../FormWrapper/FormWrapper'

interface ISelectInputProps
  extends StyledSelectProps,
    Omit<IBaseFormControlProps, 'errors' | 'touched'> {}

const FormSelect = (props: ISelectInputProps) => {
  const {
    id = props?.id || props?.name,
    name = props?.name || props?.id,
    label,
    errors,
    touched,
    isFieldArray,
    errorClassName,
    labelClassName,
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
      <Select
        {...restProps}
        id={id}
        name={name}
        errors={errors}
        touched={touched}
        isFieldArray={isFieldArray}
      />
    </FormWrapper>
  )
}

export { FormSelect }
