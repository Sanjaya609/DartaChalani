import { IconProps, IconWeight } from 'phosphor-react'
import { PropsWithChildren } from 'react'
import { Color } from '../../types'

export interface Props extends PropsWithChildren, IconProps {
  size?: Variant | number // the type of variant
  color?: Color<'text'> // tailwind text color class
  className?: string
  alt?: string
  weight?: IconWeight
  mirrored?: boolean
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
}
export type Variant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export const IconSizes: Record<Variant, number> = {
  xs: 12,

  sm: 16,

  md: 24,

  lg: 32,

  xl: 40,

  xxl: 48,

  xxxl: 56,
}
