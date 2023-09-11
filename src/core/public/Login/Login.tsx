import { Flexbox, Grid, Image } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import Logo from '@/assets/img/logo.png'
import { Text } from '@/components/ui/core/Text'
import LoginForm from './LoginForm/LoginForm'

const Login = () => {
  return (
    <section className="flex h-full w-full items-center justify-center bg-[#E5E5E5] ">
      <Grid
        sm="sm:grid-cols-12"
        justify={'justify-center'}
        alignItems="items-center"
      >
        <Grid.Col sm="sm:col-span-6">
          <Card
            className="h-[500px] w-[400px] bg-gradient-to-br from-navy-40 to-navy-24 p-6"
            borderRadius="lg"
          >
            <Flexbox direction="column" align="center" justify="center">
              <Image src={Logo} alt="Govt. Of Nepal" />
              <Text className="mt-3" typeface="bold" color="text-white">
                नेपाल सरकार
              </Text>
            </Flexbox>

            <hr className="mb-12 mt-6 border border-white" />

            <Text
              className="text-center"
              color="text-white"
              variant="h5"
              typeface="extrabold"
            >
              दर्ता चलानी मा तपाईंलाई स्वागत छ
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col sm="sm:col-span-6">
          <LoginForm />
        </Grid.Col>
      </Grid>
    </section>
  )
}

export default Login
