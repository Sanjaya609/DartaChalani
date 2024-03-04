import React from 'react'
import AbsoluteLayout from '@/components/ui/core/Layout/AbsoluteLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import MainLayout from '@/components/ui/core/Layout/MainLayout'
import { Box } from '@/components/ui/core/Box'
import { Text } from '@/components/ui/core/Text'

function Dashboard() {
  return (
    <MainLayout>
      <FlexLayout direction="column">
        <Box className="relative w-full grow">
          <AbsoluteLayout scrollable>
            <FlexLayout direction="column" justify="center" align="center">
              <FlexLayout direction="column" justify="center" align="center">
                <Text variant="h1" color="text-cool-gray-600">
                  Dashboard
                </Text>
              </FlexLayout>
            </FlexLayout>
          </AbsoluteLayout>
        </Box>
      </FlexLayout>
    </MainLayout>
  )
}

export default Dashboard
