import { getErrorStatus } from '@/utility/inputUtils/input-error'
import React, { forwardRef } from 'react'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import Switch from './Switch'

interface ISwitchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IBaseFormControlProps {}

const SwitchInput = forwardRef<HTMLInputElement, ISwitchInputProps>(
  (props, ref) => {
    const {
      id = props?.id || props?.name,
      name = props?.name || props?.id,
      label,
      type = 'checkbox',
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
        <Switch {...rest} ref={ref} />
      </FormWrapper>
    )
  }
)

export default SwitchInput
