import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Box, BoxProps } from '@/components/ui/core/Box'
import {
  GridAlignContent,
  GridAlignSelf,
  GridBreak,
  GridColValue,
  GridJustifySelf,
  GridOrder,
  UseBreakPoints,
} from '@/components/ui/core/Grid/Grid.Schema'

interface GridResponsiveCols {
  xs: `xs:col-${GridBreak<GridColValue, 'span'>}`
  sm: `sm:col-${GridBreak<GridColValue, 'span'>}`
  md: `md:col-${GridBreak<GridColValue, 'span'>}`
  lg: `lg:col-${GridBreak<GridColValue, 'span'>}`
  xl: `xl:col-${GridBreak<GridColValue, 'span'>}`
  xxl: `xxl:col-${GridBreak<GridColValue, 'span'>}`
}

export type GridColProps = BoxProps &
  Partial<GridResponsiveCols> & {
    justifySelf?:
      | UseBreakPoints<`justify-self-${GridJustifySelf}`>
      | Array<UseBreakPoints<`justify-self-${GridJustifySelf}`>>
    alignContent?:
      | UseBreakPoints<`content-${GridAlignContent}`>
      | Array<UseBreakPoints<`content-${GridAlignContent}`>>
    alignSelf?:
      | UseBreakPoints<`self-${GridAlignSelf}`>
      | Array<UseBreakPoints<`self-${GridAlignSelf}`>>
    placeSelf?:
      | UseBreakPoints<`place-self-${GridJustifySelf}`>
      | Array<UseBreakPoints<`place-self-${GridJustifySelf}`>>
    order?:
      | UseBreakPoints<`order-${GridOrder}`>
      | Array<UseBreakPoints<`order-${GridOrder}`>>
  }

const GridCol = forwardRef<HTMLElement, GridColProps>((props, ref) => {
  const {
    className: classes,
    children,
    justifySelf,
    alignContent,
    alignSelf,
    placeSelf,
    order,
    xs,
    sm,
    lg,
    md,
    xl,
    xxl,
    ...restProps
  } = props
  const className = getComputedClassNames(
    justifySelf,
    alignContent,
    alignSelf,
    placeSelf,
    order,
    xs,
    sm,
    lg,
    md,
    xl,
    xxl,
    classes
  )

  return React.createElement(
    Box,
    Object.assign(restProps, { ref, className }),
    children
  )
})

GridCol.displayName = 'GridCol'

export default GridCol
