export type ButtonVariants = 'primary' | 'secondary' | 'success' | 'danger'

export type ButtonTypes = 'solid' | 'outlined' | 'ghost'

export type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg'

export type ButtonStates =
  | 'default'
  | 'hovered'
  | 'focused'
  | 'clicked'
  | 'disabled'

export type ButtonDisplays = 'inline' | 'block'

export const DisplayMapping: Record<ButtonDisplays, string> = {
  block: 'w-full',
  inline: '',
}
export type ButtonIconType = 'icons' | 'default'
export const ButtonIcon: Record<ButtonIconType, string> = {
  icons: 'inline-flex items-center',
  default: 'inline',
}

export const ButtonBaseClasses = 'rounded-sm'

export const SizeMappings: Record<ButtonSizes, string> = {
  xs: 'p-1 text-xs leading-4',
  sm: 'p-2 text-xs leading-4',
  md: 'py-3 px-6 text-sm leading-4',
  lg: 'py-4 px-6 text-base leading-4',
}

export const DefaultClassesMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid: 'text-white bg-primary',
    outlined: 'border border-primary text-primary bg-white',
    ghost: 'text-primary bg-white',
  },
  secondary: {
    solid: 'text-gray-24 bg-gray-72',
    outlined: 'border border-gray-72 text-gray-24 bg-white',
    ghost: 'text-gray-24 bg-white',
  },
  success: {
    solid: 'text-white bg-green-40',
    outlined: 'border border-green-40 text-green-40 bg-white',
    ghost: 'text-green-40 bg-white',
  },
  danger: {
    solid: 'text-white bg-red-48',
    outlined: 'border border-red-48 text-red-48 bg-white',
    ghost: 'text-red-48 bg-white',
  },
}

export const HoverClassesMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid: 'hover:bg-primary-24',
    outlined: 'hover:bg-primary-24 hover:text-white',
    ghost: 'hover:bg-primary-24 hover:text-white',
  },
  secondary: {
    solid: 'hover:bg-gray-80',
    outlined: 'hover:bg-gray-80',
    ghost: 'hover:bg-gray-80',
  },
  success: {
    solid: 'hover:bg-green',
    outlined: 'hover:bg-green hover:text-white',
    ghost: 'hover:bg-green',
  },
  danger: {
    solid: 'hover:bg-red-800',
    outlined: 'hover:bg-red-700 hover:text-white',
    ghost: 'hover:bg-red-48 hover:text-white',
  },
}

export const FocusedClassesMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid:
      'focus:outline-0 focus:bg-primary-16 focus:border focus:border-white focus:shadow-[0px_0px_0px_2px_rgba(33,89,171,0.4)]',
    outlined: `focus:bg-primary-16 focus:text-white focus:outline-0 focus:bg-primary-16 focus:border focus:border-white focus:shadow-[0px_0px_0px_2px_rgba(33,89,171,0.4)]`,
    ghost: 'focus:bg-primary-16 focus:outline-0 focus:text-white ',
  },
  secondary: {
    solid:
      'focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,101,192,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-gray-80 focus:text-white focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,101,192,0.4)] focus:border focus:border-white',
    ghost:
      'focus:bg-gray-80 focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,101,192,0.4)] focus:border focus:border-white',
  },
  success: {
    solid:
      'focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,128,61,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-green-700 focus:text-white focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,128,61,0.4)] focus:border focus:border-white',
    ghost:
      'focus:bg-green-50 focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,128,61,0.4)] focus:border focus:border-white',
  },
  danger: {
    solid:
      'focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(201,24,74,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-red-700 focus:text-white focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(201,24,74,0.4)] focus:border focus:border-white',
    ghost:
      'focus:bg-red-48 focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(201,24,74,0.4)] focus:border focus:border-white focus:text-white',
  },
}

export const ClickedMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-purple-100 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
  secondary: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-gray-80 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
  success: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-green-200 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
  danger: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-red-100 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
}

export const DisabledMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid:
      'disabled:opacity-[0.64] disabled:hover:bg-blue-700 disabled:active:bg-blue-700 disabled:active:shadow-none',
    ghost:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-blue-700 disabled:active:shadow-none',
    outlined:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-blue-700 disabled:active:shadow-none',
  },
  secondary: {
    solid:
      'disabled:opacity-[0.64] disabled:hover:bg-blue-700 disabled:active:bg-blue-700 disabled:active:shadow-none',
    ghost:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-blue-700 disabled:active:shadow-none',
    outlined:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-blue-700 disabled:active:shadow-none',
  },
  success: {
    solid:
      'disabled:opacity-[0.64] disabled:hover:bg-green-700 disabled:active:bg-green-700 disabled:active:shadow-none',
    ghost:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-green-700 disabled:active:shadow-none',
    outlined:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-green-700 disabled:active:shadow-none',
  },
  danger: {
    solid:
      'disabled:opacity-[0.64] disabled:hover:bg-red-700 disabled:active:bg-red-700 disabled:active:shadow-none',
    ghost:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-red-700 disabled:active:shadow-none',
    outlined:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-red-700 disabled:active:shadow-none',
  },
}
