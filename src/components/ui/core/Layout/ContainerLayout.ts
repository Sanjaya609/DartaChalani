import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Box, BoxProps } from '@/components/ui/core/Box'

export type ContainerLayoutProps = BoxProps & {
  stretch?: boolean
  centered?: boolean
}

const ContainerLayout = forwardRef<HTMLElement, ContainerLayoutProps>(
  (props, ref) => {
    const { stretch, centered, className, children, ...restProps } = props
    const computedClassNames = getComputedClassNames(
      {
        'h-full': stretch,
        'my-0 mx-auto w-app-max': centered,
      },
      className,
      `px-16 w-full`
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

ContainerLayout.displayName = 'ContainerLayout'

export default ContainerLayout
