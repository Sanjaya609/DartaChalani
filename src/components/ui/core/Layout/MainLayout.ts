import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Box, BoxProps } from '@/components/ui/core/Box'

const MainLayout = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { className, children, as = 'main', ...restProps } = props
  const computedClassNames = getComputedClassNames(
    className,
    `h-full w-full grow flex flex-col bg-gray-98`
  )

  return React.createElement(
    Box,
    Object.assign(restProps, {
      ref,
      className: computedClassNames,
      as,
    }),
    children
  )
})

MainLayout.displayName = 'MainLayout'

export default MainLayout
