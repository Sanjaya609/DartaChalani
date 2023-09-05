import { Box, BoxProps } from '@/components/ui/core/Box'
import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'

const BaseLayout = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { className, children, ...restProps } = props
  const computedClassNames = getComputedClassNames(
    className,
    `flex h-full w-full flex-col`
  )

  return React.createElement(
    Box,
    Object.assign(restProps, {
      ref,
      className: computedClassNames,
    }),
    children
  )
})

BaseLayout.displayName = 'BaseLayout'

export default BaseLayout
