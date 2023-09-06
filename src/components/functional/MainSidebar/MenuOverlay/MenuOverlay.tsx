import { Icon } from '@/components/ui'
import { DotsNine } from 'phosphor-react'
import React from 'react'

const MenuOverlay = () => {
  return (
    <div className="mr-6 flex h-full items-center bg-navy-24 p-4">
      <Icon
        icon={DotsNine}
        size={24}
        color="text-white"
        className="cursor-pointer"
      />
    </div>
  )
}

export default MenuOverlay
