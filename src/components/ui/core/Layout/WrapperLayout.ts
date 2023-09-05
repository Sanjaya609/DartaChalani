import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Box, BoxProps } from '@/components/ui/core/Box'

const WrapperLayout = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { className, children, ...restProps } = props
  const computedClassNames = getComputedClassNames(
    className,
    `h-full overflow-hidden`
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

WrapperLayout.displayName = 'WrapperLayout'

export default WrapperLayout
