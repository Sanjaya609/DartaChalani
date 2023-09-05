export type ButtonVariants =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray'

export type ButtonTypes = 'solid' | 'outlined' | 'ghost'

export type ButtonSizes = 'xs' | 'small' | 'regular' | 'large'

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
  small: 'p-2 text-xs leading-4',
  regular: 'py-3 px-6 text-sm leading-4',
  large: 'py-4 px-6 text-base leading-4',
}

export const DefaultClassesMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid: 'text-white bg-primary-16',
    outlined: 'border border-primary-16 text-primary-16 bg-white',
    ghost: 'text-primary-16 bg-white',
  },
  info: {
    solid: 'text-white bg-blue-700',
    outlined: 'border border-blue-700 text-blue-700 bg-white',
    ghost: 'text-blue-700 bg-white',
  },
  success: {
    solid: 'text-white bg-green-700',
    outlined: 'border border-green-700 text-green-700 bg-white',
    ghost: 'text-green-700 bg-white',
  },
  warning: {
    solid: 'text-white bg-yellow-700 ',
    outlined: 'border border-yellow-700 text-yellow-700 bg-white',
    ghost: 'text-gray-56',
  },
  danger: {
    solid: 'text-white bg-red-48',
    outlined: 'border border-red-700 text-red-700 bg-white',
    ghost: 'text-red-700 bg-white',
  },
  gray: {
    solid: 'text-gray-700 bg-gray-300 ',
    outlined: 'border border-gray-300 text-gray-700 bg-white',
    ghost: 'text-white',
  },
}

export const HoverClassesMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid: 'hover:bg-primary-48',
    outlined: 'hover:bg-primary-48 hover:text-white',
    ghost: 'hover:bg-primary-48',
  },
  info: {
    solid: 'hover:bg-blue-800',
    outlined: 'hover:bg-blue-700 hover:text-white',
    ghost: 'hover:bg-blue-50',
  },
  success: {
    solid: 'hover:bg-green-800',
    outlined: 'hover:bg-green-700 hover:text-white',
    ghost: 'hover:bg-green-50',
  },
  warning: {
    solid: 'hover:bg-yellow-800',
    outlined: 'hover:bg-yellow-700 hover:text-white',
    ghost: 'hover:text-orange-48',
  },
  danger: {
    solid: 'hover:bg-red-800',
    outlined: 'hover:bg-red-700 hover:text-white',
    ghost: 'hover:bg-red-50',
  },
  gray: {
    solid: 'hover:bg-gray-80',
    outlined: 'hover:bg-gray-300 hover:text-gray-700',
    ghost: '',
  },
}

export const FocusedClassesMapping: Record<
  ButtonVariants,
  Record<ButtonTypes, string>
> = {
  primary: {
    solid:
      'focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(33,89,171,0.4)] focus:border focus:border-white',
    outlined: `focus:bg-purple-700 focus:text-white focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(33,89,171,0.4)] focus:border focus:border-white`,
    ghost: 'focus:bg-primary-16 focus:outline-0 focus:text-white ',
  },
  info: {
    solid:
      'focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,101,192,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-blue-700 focus:text-white focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,101,192,0.4)] focus:border focus:border-white',
    ghost:
      'focus:bg-blue-50 focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,101,192,0.4)] focus:border focus:border-white',
  },
  success: {
    solid:
      'focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,128,61,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-green-700 focus:text-white focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,128,61,0.4)] focus:border focus:border-white',
    ghost:
      'focus:bg-green-50 focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(21,128,61,0.4)] focus:border focus:border-white',
  },
  warning: {
    solid:
      'focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(251,191,36,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-yellow-700 focus:text-white focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(251,191,36,0.4)] focus:border focus:border-white',
    ghost:
      'focus:bg-yellow-50 focus:outline-0  focus:shadow-[0px_0px_0px_2px_rgba(251,191,36,0.4)] focus:border focus:border-white',
  },
  danger: {
    solid:
      'focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(201,24,74,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-red-700 focus:text-white focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(201,24,74,0.4)] focus:border focus:border-white',
    ghost:
      'focus:bg-red-50 focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(201,24,74,0.4)] focus:border focus:border-white',
  },
  gray: {
    solid:
      'focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(73,80,87,0.4)] focus:border focus:border-white',
    outlined:
      'focus:bg-gray-300 focus:text-gray-700 focus:outline-0 focus:shadow-[0px_0px_0px_2px_rgba(73,80,87,0.4)] focus:border focus:border-white',
    ghost: '',
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
  info: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-blue-100 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
  success: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-green-200 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
  warning: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-purple-100 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
  danger: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: 'active:bg-red-100 active:shadow-none',
    outlined: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
  },
  gray: {
    solid: 'active:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.32)]',
    ghost: '',
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
  info: {
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
  warning: {
    solid:
      'disabled:opacity-[0.64] disabled:hover:bg-yellow-700 disabled:active:bg-yellow-700 disabled:active:shadow-none',
    ghost:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-yellow-700 disabled:active:shadow-none',
    outlined:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-yellow-700 disabled:active:shadow-none',
  },
  danger: {
    solid:
      'disabled:opacity-[0.64] disabled:hover:bg-red-700 disabled:active:bg-red-700 disabled:active:shadow-none',
    ghost:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-red-700 disabled:active:shadow-none',
    outlined:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-red-700 disabled:active:shadow-none',
  },
  gray: {
    solid:
      'disabled:text-gray-700 disabled:opacity-[0.64] disabled:hover:bg-gray-300 disabled:active:bg-gray-300 disabled:active:shadow-none',
    ghost:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-gray-700  disabled:active:shadow-none',
    outlined:
      'disabled:opacity-[0.64] disabled:hover:bg-white disabled:hover:text-gray-700  disabled:active:shadow-none',
  },
}
