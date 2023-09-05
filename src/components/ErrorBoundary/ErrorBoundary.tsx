import { Box, Button, Flexbox } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'

const ErrorBoundary = () => {
  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <Box className="h-[100vh] w-full overflow-hidden ">
      <Flexbox className="h-full w-full">
        <Box className="flex h-[100vh] w-full items-center justify-center">
          <Box className="text-center">
            <Text as="h1">Something went wrong! </Text>
            <summary className="mx-auto my-2 block cursor-default">
              <p>
                Oops, looks like there are some problem we are facing. Please
                check in later.
              </p>
            </summary>

            <Button onClick={refreshPage}>Refresh Page</Button>
          </Box>
        </Box>
      </Flexbox>
    </Box>
  )
}

export default ErrorBoundary
