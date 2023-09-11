import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/shadcn/ShadCollapse/ShadCollapse'
import { CollapsibleProps } from '@radix-ui/react-collapsible'
import React from 'react'

interface ICollapseProps extends CollapsibleProps {
  children: React.ReactNode
}

const Collapse = (props: ICollapseProps) => {
  const { children } = props
  return <Collapsible {...props}>{children}</Collapsible>
}

export default Collapse

export { CollapsibleTrigger, CollapsibleContent }

export type { ICollapseProps }
