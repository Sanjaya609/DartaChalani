import { Context, useEffect, useState } from 'react'
import { IconProps } from 'react-toastify'

export const useIconsPack = () => {
  const [iconPack, setIconPack] =
    useState<{ icon: Context<IconProps>; iconName: string }[]>()

  useEffect(() => {
    if (!iconPack) {
      import('phosphor-react').then((module) => {
        const phosporIcons = { ...module }
        const modifiedIcons = Object.values(phosporIcons).map(
          (icon, index) => ({
            icon: icon as unknown as Context<IconProps>,
            iconName:
              (icon as unknown as Context<IconProps>)?.displayName ||
              `undefinedIcon-${index}`,
          })
        )
        setIconPack(modifiedIcons)
      })
    }
  }, [iconPack])

  return iconPack
}
