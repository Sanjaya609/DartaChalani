import { Box } from '@/components/ui/core/Box'
import { Button } from '@/components/ui/core/Button'
import AbsoluteLayout from '@/components/ui/core/Layout/AbsoluteLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import MainLayout from '@/components/ui/core/Layout/MainLayout'
import { Text } from '@/components/ui/core/Text'
import { Image } from '@/components/ui/core/Image'
import { ReactElement, useEffect } from 'react'
import { useAuth } from '@/providers'
import { publicRoutePath, useNavigate } from '@/router'
import notfound from '../assets/svg/notfound.svg'

function NotFound({ children }: { children?: ReactElement }) {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(publicRoutePath.login)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <MainLayout>
      <FlexLayout direction="column">
        <Box className="relative w-full grow">
          <AbsoluteLayout scrollable>
            <FlexLayout direction="column" justify="center" align="center">
              <FlexLayout direction="column" justify="center" align="center">
                <Text variant="h1" color="text-cool-gray-600">
                  OOPS!!
                </Text>
                {children || (
                  <Text variant="small" color="text-cool-gray-600">
                    We can’t seem to find the page you’re looking for
                  </Text>
                )}
                <Image src={notfound} alt="not found image" className="py-6" />
                <Box as="div">
                  <Button
                    size="lg"
                    onClick={() => navigate(-1)}
                    variant="primary"
                    className="rounded-md px-16"
                  >
                    Go Back
                  </Button>
                </Box>
              </FlexLayout>
            </FlexLayout>
          </AbsoluteLayout>
        </Box>
      </FlexLayout>
    </MainLayout>
  )
}

export default NotFound
