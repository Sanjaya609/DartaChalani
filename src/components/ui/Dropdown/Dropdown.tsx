import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/shadcn/ShadDropdown/ShadDropdown'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

interface IDropdownProps extends DropdownMenuProps {
  triggerElement?: React.ReactNode
  children?: React.ReactNode
}

const Dropdown = (props: IDropdownProps) => {
  const { triggerElement, children, ...restProps } = props
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-0">
        {triggerElement}
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

Dropdown.DropdownMenuItem = DropdownMenuItem

export type { DropdownMenuProps }

export default Dropdown
