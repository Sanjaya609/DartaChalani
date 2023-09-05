import { BreakPoints, Spacing, SpacingValue } from '@/components/ui/types'

export type GridColValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type GridRowValue = 1 | 2 | 3 | 4 | 5 | 6

export type GridBreak<
  Value extends number,
  Text extends string
> = `${Text}-${Value}`

export type UseBreakPoints<Value extends string> =
  | Value
  | `${BreakPoints}:${Value}`

export type GridGap = `${SpacingValue}` | `${'x' | 'y'}-${SpacingValue}`

export type GridFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'

export type GridAuto = `auto` | `min` | `max` | `fr`

export type GridJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'

export type GridJustifyItems = 'start' | 'end' | 'center' | 'stretch'

export type GridJustifySelf = 'auto' | 'start' | 'end' | 'center' | 'stretch'

export type GridAlignContent =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'baseline'

export type GridAlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export type GridAlignSelf =
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'baseline'

export type GridPlaceContent =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'baseline'
  | 'stretch'

export type GridPlaceItems = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

export type GridOrder =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'first'
  | 'last'
  | 'none'

export interface GridStartEnd<Value> {
  span: Value
  end?: Value
  start?: Value
}
export const GridGapClassMapping: Record<Spacing, `gap-${Spacing}`> = {
  '0': 'gap-0',
  'x-0': 'gap-x-0',
  '0.5': 'gap-0.5',
  '1': 'gap-1',
  '1.5': 'gap-1.5',
  '10': 'gap-10',
  '11': 'gap-11',
  '12': 'gap-12',
  '14': 'gap-14',
  '16': 'gap-16',
  '2': 'gap-2',
  '2.5': 'gap-2.5',
  '20': 'gap-20',
  '24': 'gap-24',
  '28': 'gap-28',
  '3': 'gap-3',
  '3.5': 'gap-3.5',
  '32': 'gap-32',
  '36': 'gap-36',
  '4': 'gap-4',
  '40': 'gap-40',
  '44': 'gap-44',
  '48': 'gap-48',
  '5': 'gap-5',
  '52': 'gap-52',
  '56': 'gap-56',
  '6': 'gap-6',
  '60': 'gap-60',
  '64': 'gap-64',
  '7': 'gap-7',
  '72': 'gap-72',
  '8': 'gap-8',
  '80': 'gap-80',
  '9': 'gap-9',
  '96': 'gap-96',
  'x-0.5': 'gap-x-0.5',
  'x-1': 'gap-x-1',
  'x-1.5': 'gap-x-1.5',
  'x-10': 'gap-x-10',
  'x-11': 'gap-x-11',
  'x-12': 'gap-x-12',
  'x-14': 'gap-x-14',
  'x-16': 'gap-x-16',
  'x-2': 'gap-x-2',
  'x-2.5': 'gap-x-2.5',
  'x-20': 'gap-x-20',
  'x-24': 'gap-x-24',
  'x-28': 'gap-x-28',
  'x-3': 'gap-x-3',
  'x-3.5': 'gap-x-3.5',
  'x-32': 'gap-x-32',
  'x-36': 'gap-x-36',
  'x-4': 'gap-x-4',
  'x-40': 'gap-x-40',
  'x-44': 'gap-x-44',
  'x-48': 'gap-x-48',
  'x-5': 'gap-x-5',
  'x-52': 'gap-x-52',
  'x-56': 'gap-x-56',
  'x-6': 'gap-x-6',
  'x-60': 'gap-x-60',
  'x-64': 'gap-x-64',
  'x-7': 'gap-x-7',
  'x-72': 'gap-x-72',
  'x-8': 'gap-x-8',
  'x-80': 'gap-x-80',
  'x-9': 'gap-x-9',
  'x-96': 'gap-x-96',
  'y-0': 'gap-y-0',
  'y-0.5': 'gap-y-0.5',
  'y-1': 'gap-y-1',
  'y-1.5': 'gap-y-1.5',
  'y-10': 'gap-y-10',
  'y-11': 'gap-y-11',
  'y-12': 'gap-y-12',
  'y-14': 'gap-y-14',
  'y-16': 'gap-y-16',
  'y-2': 'gap-y-2',
  'y-2.5': 'gap-y-2.5',
  'y-20': 'gap-y-20',
  'y-24': 'gap-y-24',
  'y-28': 'gap-y-28',
  'y-3': 'gap-y-3',
  'y-3.5': 'gap-y-3.5',
  'y-32': 'gap-y-32',
  'y-36': 'gap-y-36',
  'y-4': 'gap-y-4',
  'y-40': 'gap-y-40',
  'y-44': 'gap-y-44',
  'y-48': 'gap-y-48',
  'y-5': 'gap-y-5',
  'y-52': 'gap-y-52',
  'y-56': 'gap-y-56',
  'y-6': 'gap-y-6',
  'y-60': 'gap-y-60',
  'y-64': 'gap-y-64',
  'y-7': 'gap-y-7',
  'y-72': 'gap-y-72',
  'y-8': 'gap-y-8',
  'y-80': 'gap-y-80',
  'y-9': 'gap-y-9',
  'y-96': 'gap-y-96',
}
export const GridFlowClassMapping: Record<GridFlow, `grid-flow-${GridFlow}`> = {
  col: 'grid-flow-col',
  dense: 'grid-flow-dense',
  'col-dense': 'grid-flow-col-dense',
  'row-dense': 'grid-flow-row-dense',
  row: 'grid-flow-row',
}

export const GridTemplateRowClassMapping: Record<
  GridRowValue,
  `grid-rows-${GridRowValue}`
> = {
  '1': 'grid-rows-1',
  '2': 'grid-rows-2',
  '3': 'grid-rows-3',
  '4': 'grid-rows-4',
  '5': 'grid-rows-5',
  '6': 'grid-rows-6',
}

export const GridTemplateColumnClassMapping: Record<
  GridColValue,
  `grid-col-${GridColValue}`
> = {
  '1': 'grid-col-1',
  '2': 'grid-col-2',
  '3': 'grid-col-3',
  '4': 'grid-col-4',
  '5': 'grid-col-5',
  '6': 'grid-col-6',
  '7': 'grid-col-7',
  '8': 'grid-col-8',
  '9': 'grid-col-9',
  '10': 'grid-col-10',
  '11': 'grid-col-11',
  '12': 'grid-col-12',
}

export const GridRowAutoClassMapping: Record<
  GridAuto,
  `auto-rows-${GridAuto}`
> = {
  max: 'auto-rows-max',
  auto: 'auto-rows-auto',
  fr: 'auto-rows-fr',
  min: 'auto-rows-min',
}

export const GridColumnAutoClassMapping: Record<
  GridAuto,
  `auto-cols-${GridAuto}`
> = {
  max: 'auto-cols-max',
  auto: 'auto-cols-auto',
  fr: 'auto-cols-fr',
  min: 'auto-cols-min',
}

export const GridJustifyClassMapping: Record<
  GridJustify,
  `justify-${GridJustify}`
> = {
  around: 'justify-around',
  between: 'justify-between',
  center: 'justify-center',
  evenly: 'justify-evenly',
  start: 'justify-start',
  end: 'justify-end',
}

export const GridJustifyItemsClassMapping: Record<
  GridJustifyItems,
  `justify-items-${GridJustifyItems}`
> = {
  start: 'justify-items-start',
  end: 'justify-items-end',
  center: 'justify-items-center',
  stretch: 'justify-items-stretch',
}

export const GridJustifySelfClassMapping: Record<
  GridJustifySelf,
  `justify-self-${GridJustifySelf}`
> = {
  auto: 'justify-self-auto',
  start: 'justify-self-start',
  end: 'justify-self-end',
  center: 'justify-self-center',
  stretch: 'justify-self-stretch',
}

export const GridAlignContentClassMapping: Record<
  GridAlignContent,
  `content-${GridAlignContent}`
> = {
  center: 'content-center',
  start: 'content-start',
  end: 'content-end',
  between: 'content-between',
  around: 'content-around',
  evenly: 'content-evenly',
  baseline: 'content-baseline',
}

export const GridAlignItemsClassMapping: Record<
  GridAlignItems,
  `items-${GridAlignItems}`
> = {
  end: 'items-end',
  baseline: 'items-baseline',
  start: 'items-baseline',
  center: 'items-center',
  stretch: 'items-stretch',
}

export const GridAlignSelfClassMapping: Record<
  GridAlignSelf,
  `self-${GridAlignSelf}`
> = {
  auto: 'self-auto',
  start: 'self-start',
  end: 'self-end',
  center: 'self-center',
  stretch: 'self-stretch',
  baseline: 'self-baseline',
}

export const GridPlaceContentClassMapping: Record<
  GridPlaceContent,
  `place-content-${GridPlaceContent}`
> = {
  center: 'place-content-center',
  start: 'place-content-start',
  end: 'place-content-end',
  between: 'place-content-between',
  around: 'place-content-around',
  evenly: 'place-content-evenly',
  baseline: 'place-content-baseline',
  stretch: 'place-content-stretch',
}

export const GridPlaceItemsClassMapping: Record<
  GridPlaceItems,
  `place-items-${GridPlaceItems}`
> = {
  start: 'place-items-start',
  end: 'place-items-end',
  center: 'place-items-center',
  stretch: 'place-items-stretch',
  baseline: 'place-items-baseline',
}

export const GridPlaceSelfClassMapping: Record<
  GridJustifySelf,
  `place-self-${GridJustifySelf}`
> = {
  auto: 'place-self-auto',
  start: 'place-self-start',
  end: 'place-self-end',
  center: 'place-self-center',
  stretch: 'place-self-stretch',
}

export const GridColStart: Record<
  GridColValue,
  `col-${GridBreak<GridColValue, 'start'>}`
> = {
  '1': 'col-start-1',
  '2': 'col-start-2',
  '3': 'col-start-3',
  '4': 'col-start-4',
  '5': 'col-start-5',
  '6': 'col-start-6',
  '7': 'col-start-7',
  '8': 'col-start-8',
  '9': 'col-start-9',
  '10': 'col-start-10',
  '11': 'col-start-11',
  '12': 'col-start-12',
}

export const GridRowStart: Record<
  GridRowValue,
  `row-${GridBreak<GridRowValue, 'start'>}`
> = {
  '1': 'row-start-1',
  '2': 'row-start-2',
  '3': 'row-start-3',
  '4': 'row-start-4',
  '5': 'row-start-5',
  '6': 'row-start-6',
}

export const GridColSpan: Record<
  GridColValue,
  `col-${GridBreak<GridColValue, 'span'>}`
> = {
  '1': 'col-span-1',
  '2': 'col-span-2',
  '3': 'col-span-3',
  '4': 'col-span-4',
  '5': 'col-span-5',
  '6': 'col-span-6',
  '7': 'col-span-7',
  '8': 'col-span-8',
  '9': 'col-span-9',
  '10': 'col-span-10',
  '11': 'col-span-11',
  '12': 'col-span-12',
}

export const GridRowSpan: Record<
  GridRowValue,
  `row-${GridBreak<GridRowValue, 'span'>}`
> = {
  '1': 'row-span-1',
  '2': 'row-span-2',
  '3': 'row-span-3',
  '4': 'row-span-4',
  '5': 'row-span-5',
  '6': 'row-span-6',
}

export const GridColEnd: Record<
  GridColValue,
  `col-${GridBreak<GridColValue, 'end'>}`
> = {
  '1': 'col-end-1',
  '2': 'col-end-2',
  '3': 'col-end-3',
  '4': 'col-end-4',
  '5': 'col-end-5',
  '6': 'col-end-6',
  '7': 'col-end-7',
  '8': 'col-end-8',
  '9': 'col-end-9',
  '10': 'col-end-10',
  '11': 'col-end-11',
  '12': 'col-end-12',
}

export const GridRowEnd: Record<
  GridRowValue,
  `row-${GridBreak<GridRowValue, 'span'>}`
> = {
  '1': 'row-span-1',
  '2': 'row-span-2',
  '3': 'row-span-3',
  '4': 'row-span-4',
  '5': 'row-span-5',
  '6': 'row-span-6',
}

export const GridOrderClassMapping: Record<GridOrder, `order-${GridOrder}`> = {
  '1': 'order-1',
  '2': 'order-2',
  '3': 'order-3',
  '4': 'order-4',
  '5': 'order-5',
  '6': 'order-6',
  '7': 'order-7',
  '8': 'order-8',
  '9': 'order-9',
  '10': 'order-10',
  '11': 'order-11',
  '12': 'order-12',
  first: 'order-first',
  last: 'order-last',
  none: 'order-none',
}
