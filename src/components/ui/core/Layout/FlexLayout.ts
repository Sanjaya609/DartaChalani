import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Flexbox, FlexboxProps } from '@/components/ui/core/Flexbox/Flexbox'

const FlexLayout = forwardRef<HTMLElement, FlexboxProps>((props, ref) => {
  const { className, children, ...restProps } = props
  const computedClassNames = getComputedClassNames(className, `h-full w-full`)

  return React.createElement(
    Flexbox,
    Object.assign(restProps, {
      ref,
      className: computedClassNames,
    }),
    children
  )
})

FlexLayout.displayName = 'FlexLayout'

export default FlexLayout
