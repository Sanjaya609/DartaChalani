import { Icon } from '@/components/ui'
import { useBoolean } from '@/hooks'
import { Eye, EyeClosed } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import Form from '../Form/Form'

interface IPasswordInput
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IBaseFormControlProps {}

const PasswordInput = (props: IPasswordInput) => {
  const { t } = useTranslation()
  const {
    wrapperClassName = 'mb-4',
    id = 'password',
    label = t('form.password'),
    isRequired,
    ...restProps
  } = props
  const { value: showPassword, toggle: toggleShowPassword } = useBoolean(false)

  return (
    <Form.Input
      {...restProps}
      id={id}
      wrapperClassName={wrapperClassName}
      label={label}
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <Icon
          onClick={toggleShowPassword}
          icon={showPassword ? Eye : EyeClosed}
          className="mr-2 cursor-pointer"
        />
      }
      isRequired={isRequired}
    />
  )
}

export default PasswordInput
