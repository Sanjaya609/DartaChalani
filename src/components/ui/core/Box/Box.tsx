import React, { ComponentPropsWithoutRef } from 'react'

export type BoxAS =
  | 'div'
  | 'span'
  | 'aside'
  | 'main'
  | 'header'
  | 'section'
  | 'footer'

export type BoxProps<T extends BoxAS = BoxAS> = ComponentPropsWithoutRef<T> & {
  as?: T
}

const Box = React.forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { as = 'div', children, ...restProps } = props
  return React.createElement(as, { ...restProps, ref }, children)
})

Box.displayName = 'Box'

export default Box
