import { Flexbox } from '@/components/ui'
import React from 'react'

interface INoDataFound {
  labelText?: string
}
export const TableNoDataFound: React.FC<INoDataFound> = ({
  labelText = 'There are no records to display',
}) => {
  return (
    <tbody className="relative">
      <Flexbox
        className="absolute top-0 w-full gap-4"
        align="center"
        justify="center"
      >
        {labelText}
      </Flexbox>
    </tbody>
  )
}
