import { Icon } from '@/components/ui'
import { useBoolean } from '@/hooks'
import { Eye, EyeClosed } from 'phosphor-react'
import Form from '../Form/Form'

const PasswordInput = () => {
  const { value: showPassword, toggle: toggleShowPassword } = useBoolean(false)

  return (
    <Form.Input
      id="password"
      wrapperClassName="mb-4"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <Icon
          onClick={toggleShowPassword}
          icon={showPassword ? Eye : EyeClosed}
          className="mr-2 cursor-pointer"
        />
      }
    />
  )
}

export default PasswordInput
