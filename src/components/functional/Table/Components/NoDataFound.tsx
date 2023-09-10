import { Flexbox } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
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
        <Text variant="paragraph">{labelText}</Text>
      </Flexbox>
    </tbody>
  )
}
