import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import {
  AlignClassMapping,
  VariantClassMapping,
  VariantMapping,
  Align,
  Variant,
} from './Text.schema'
import { Color, TypeFace } from '@/components/ui/types'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { TypeFaceClassMapping } from '@/components/ui/schema'

export type TextProps<AS extends React.ElementType = React.ElementType> =
  PropsWithChildren &
    ComponentPropsWithoutRef<AS> & {
      variant?: Variant // the type of text
      as?: AS // eg: h1, h2, p, small
      align?: Align
      typeface?: TypeFace
      noWrap?: boolean
      color?: Color<'text'> // tailwind text color class
      className?: string
    }

const Text = React.forwardRef<HTMLElement, TextProps>((props, ref) => {
  const {
    as,
    variant = 'paragraph',
    align = 'inherit',
    noWrap,
    color,
    typeface = 'normal',
    className,
    children,
    ...restProps
  } = props

  const computedClasses = getComputedClassNames(
    { 'whitespace-nowrap text-ellipsis': noWrap },
    VariantClassMapping[variant],
    AlignClassMapping[align],
    color,
    TypeFaceClassMapping[typeface],
    className
  )
  return React.createElement(
    as || VariantMapping[variant],
    { ...restProps, ref, className: computedClasses },
    children
  )
})

Text.displayName = 'Text'

export default Text
