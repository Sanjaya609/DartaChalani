import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React from 'react'
import { Props, IconSizes } from './Icon.schema'

const Icon = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { size, color, className, children, icon, ...restProps } = props
  const computedClasses = getComputedClassNames(className, color)
  return React.createElement(
    icon,
    {
      ...restProps,
      ref,
      size: `${typeof size === 'number' ? size : IconSizes[size || 'sm']}`,
      className: computedClasses,
    },
    children
  )
})
Icon.displayName = 'Icon'
export { Icon }
