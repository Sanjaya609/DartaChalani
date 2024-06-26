import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Box, BoxProps } from '@/components/ui/core/Box'

type AbsoluteLayoutProps = BoxProps & {
  scrollable?: boolean
  removeAbsolute?: boolean
}

const AbsoluteLayout = forwardRef<HTMLElement, AbsoluteLayoutProps>(
  (props, ref) => {
    const { scrollable, className, children, removeAbsolute, ...restProps } =
      props
    const computedClassNames = getComputedClassNames(
      { scrollbars: scrollable },
      className,
      `${removeAbsolute ? '' : 'absolute h-full'} top-0 inset-0  w-full`
    )

    return React.createElement(
      Box,
      Object.assign(restProps, {
        ref,
        className: computedClassNames,
      }),
      children
    )
  }
)

AbsoluteLayout.displayName = 'AbsoluteLayout'

export default AbsoluteLayout
