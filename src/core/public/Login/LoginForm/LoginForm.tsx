import Form from '@/components/functional/Form/Form'
import { Button } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { FormEvent } from 'react'
import { useLogin } from '../services/login.query'

const LoginForm = () => {
  const { mutate, isLoading } = useLogin()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate({
      username: 'ramesh.koirala',
      password: 'Test@123',
      grant_type: 'password',
    })
  }

  return (
    <Card className="rounded-r-lg px-8 py-7">
      <Text variant="h6" typeface="extrabold" className="mb-4">
        लग -इन
      </Text>

      <form onSubmit={handleSubmit}>
        <Form.Input
          label="Username"
          className="w-full"
          wrapperClassName="mb-4"
        />
        <Form.Input
          wrapperClassName="mb-4"
          label="Password"
          type="password"
          className="w-full"
          // rightIcon={<Icon icon={Eye} />}
        />

        <Button loading={isLoading} className="w-full">
          Login
        </Button>
      </form>
    </Card>
  )
}

export default LoginForm
