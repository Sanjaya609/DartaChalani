import React, { forwardRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Box, BoxProps } from '@/components/ui/core/Box'
import {
  GridAlignItems,
  GridAuto,
  GridColValue,
  GridFlow,
  GridJustify,
  GridJustifyItems,
  GridPlaceContent,
  GridPlaceItems,
  GridRowValue,
  UseBreakPoints,
} from '@/components/ui/core/Grid/Grid.Schema'
import GridCol, { GridColProps } from '@/components/ui/core/Grid/GridCols'
import { Spacing } from '@/components/ui/types'

interface GridResponsiveCols {
  sm?: `sm:grid-cols-${GridColValue}`
  xs?: `xs:grid-cols-${GridColValue}`
  md?: `md:grid-cols-${GridColValue}`
  lg?: `lg:grid-cols-${GridColValue}`
  xl?: `xl:grid-cols-${GridColValue}`
  xxl?: `xxl:grid-cols-${GridColValue}`
}

export type GridProps = BoxProps &
  GridResponsiveCols & {
    gap?:
      | UseBreakPoints<`gap-${Spacing}`>
      | Array<UseBreakPoints<`gap-${Spacing}`>>
    flow?:
      | UseBreakPoints<`grid-flow-${GridFlow}`>
      | Array<UseBreakPoints<`grid-flow-${GridFlow}`>>
    rows?:
      | UseBreakPoints<`grid-rows-${GridRowValue}`>
      | Array<UseBreakPoints<`grid-rows-${GridRowValue}`>>
    columnAuto?:
      | UseBreakPoints<`auto-cols-${GridAuto}`>
      | Array<UseBreakPoints<`auto-cols-${GridAuto}`>>
    rowAuto?:
      | UseBreakPoints<`auto-rows-${GridAuto}`>
      | Array<UseBreakPoints<`auto-rows-${GridAuto}`>>
    justify?:
      | UseBreakPoints<`justify-${GridJustify}`>
      | Array<UseBreakPoints<`justify-${GridJustify}`>>
    justifyItems?:
      | UseBreakPoints<`justify-items-${GridJustifyItems}`>
      | Array<UseBreakPoints<`justify-${GridJustify}`>>
    alignItems?:
      | UseBreakPoints<`items-${GridAlignItems}`>
      | Array<UseBreakPoints<`items-${GridAlignItems}`>>
    placeContent?:
      | UseBreakPoints<`place-content-${GridPlaceContent}`>
      | Array<UseBreakPoints<`place-content-${GridPlaceContent}`>>
    placeItems?:
      | UseBreakPoints<`place-items-${GridPlaceItems}`>
      | Array<UseBreakPoints<`place-items-${GridPlaceItems}`>>
  }

interface GridChild {
  Col: React.ForwardRefExoticComponent<
    GridColProps & React.RefAttributes<HTMLElement>
  >
}

type GridType = React.ForwardRefExoticComponent<
  GridProps & React.RefAttributes<HTMLElement>
>

// eslint-disable-next-line
// @ts-ignore
const Grid: GridType & GridChild = forwardRef<HTMLElement, GridProps>(
  (props, ref) => {
    const {
      className: classes,
      gap,
      flow,
      rows,
      columnAuto,
      rowAuto,
      justify,
      justifyItems,
      alignItems,
      placeContent,
      placeItems,
      children,
      xs,
      xl,
      xxl,
      lg,
      md,
      sm,
      ...restProps
    } = props

    const className = getComputedClassNames(
      `grid`,
      gap,
      flow,
      rows,
      rowAuto,
      columnAuto,
      justify,
      justifyItems,
      alignItems,
      placeContent,
      placeItems,
      xl,
      xxl,
      lg,
      md,
      sm,
      xs,
      classes
    )

    return React.createElement(
      Box,
      Object.assign(restProps, { ref, className }),
      children
    )
  }
)

Grid.Col = GridCol
Grid.displayName = 'Grid'

export default Grid
