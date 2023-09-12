import { Icon } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { Link } from '@/router'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { CaretDown } from 'phosphor-react'
import Collapse, {
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../Collapse/Collapse'
import { ISidebarItem } from './sidebar.interface'
import {
  sideBarAsideWrapper,
  sidebarCollapseTriggerStyle,
  sidebarLinkStyle,
} from './sidebar.styles'

interface ISidebarProps {
  sideBarItem: ISidebarItem[]
}

const Sidebar = (props: ISidebarProps) => {
  const { sideBarItem } = props
  const computedSidebarLinkStyle = getComputedClassNames(sidebarLinkStyle)
  const computedCollapseSidebarLinkStyle =
    getComputedClassNames(sidebarLinkStyle)

  return (
    <aside className={sideBarAsideWrapper}>
      {sideBarItem.map((sidebar) => {
        if (sidebar?.children?.length) {
          return (
            <Collapse className={computedCollapseSidebarLinkStyle}>
              <CollapsibleTrigger className={sidebarCollapseTriggerStyle}>
                <Text variant="subtitle2" className="text-white">
                  {sidebar.title}
                </Text>
                <Icon className="text-white" icon={CaretDown} size={16}></Icon>
              </CollapsibleTrigger>

              <CollapsibleContent className="w-full">
                {sidebar.children.map((sChild) => (
                  <Link className={computedSidebarLinkStyle} to={sidebar.path}>
                    <Text variant="subtitle2" className="text-white">
                      {sChild.title}
                    </Text>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapse>
          )
        }
        return (
          <Link className={computedSidebarLinkStyle} to={sidebar.path}>
            <Text variant="subtitle2" className="text-white">
              {sidebar.title}
            </Text>
          </Link>
        )
      })}
    </aside>
  )
}

export default Sidebar
