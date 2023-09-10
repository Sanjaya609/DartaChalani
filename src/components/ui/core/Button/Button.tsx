import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React, { forwardRef } from 'react'
import { Spinner } from '@/components/ui/Spinner'
import {
  ButtonBaseClasses,
  ButtonDisplays,
  ButtonIcon,
  ButtonIconType,
  ButtonSizes,
  ButtonTypes,
  ButtonVariants,
  ClickedMapping,
  DefaultClassesMapping,
  DisabledMapping,
  DisplayMapping,
  FocusedClassesMapping,
  HoverClassesMapping,
  SizeMappings,
} from './Button.schema'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: ButtonVariants
  btnType?: ButtonTypes
  size?: ButtonSizes
  display?: ButtonDisplays
  icons?: ButtonIconType
  disabled?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      display = 'inline',
      btnType = 'solid',
      icons = 'default',
      disabled = false,
      loading,
      ...buttonProps
    } = props

    const classNames = getComputedClassNames(
      ButtonBaseClasses,
      SizeMappings[size],
      ButtonIcon[icons],
      DisplayMapping[display],
      DefaultClassesMapping[variant][btnType],
      HoverClassesMapping[variant][btnType],
      FocusedClassesMapping[variant][btnType],
      ClickedMapping[variant][btnType],
      DisabledMapping[variant][btnType],
      buttonProps.className
    )

    return (
      <button
        type="button"
        ref={ref}
        {...buttonProps}
        className={classNames}
        disabled={disabled}
      >
        {loading ? <Spinner size={size} /> : buttonProps.children}
      </button>
    )
  }
)

Button.displayName = 'Button'
