import { Icon } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { useAuth } from '@/providers'
import { Link, useLocation } from '@/router'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { CaretDown } from 'phosphor-react'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
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
  currentPath?: string
}

const Sidebar = (props: ISidebarProps) => {
  const { sideBarItem, currentPath } = props
  const computedSidebarLinkStyle = getComputedClassNames(sidebarLinkStyle)
  const computedCollapseSidebarLinkStyle =
    getComputedClassNames(sidebarLinkStyle)

  const location = useLocation()
  const { flatModulePropsFromURL } = useAuth()
  const navigate = useNavigate()

  const privilegeSideBarItem = useMemo(
    () =>
      sideBarItem
        .filter((navList) => {
          return !!navList?.bypass || flatModulePropsFromURL?.[navList.path]
            ? !flatModulePropsFromURL?.[navList.path]?.isConfigurable ||
                !!flatModulePropsFromURL?.[navList?.path]?.resourceResponses
                  ?.length
            : false
        })
        .map((navList) => ({
          ...navList,
          titleEn: flatModulePropsFromURL?.[navList.path]?.moduleNameEnglish,
          titleNp: flatModulePropsFromURL?.[navList.path]?.moduleNameNepali,
        })),
    []
  )

  useEffect(() => {
    if (
      location.pathname === currentPath ||
      location.pathname === `${currentPath}/`
    ) {
      if (privilegeSideBarItem.length) {
        navigate(privilegeSideBarItem[0].path)
      }
    }
  }, [privilegeSideBarItem, navigate, location.pathname])
  return (
    <aside className={sideBarAsideWrapper}>
      {privilegeSideBarItem.map((sidebar) => {
        const isActive = location.pathname.includes(sidebar.path)

        if (sidebar?.children?.length) {
          return (
            <Collapse className={computedCollapseSidebarLinkStyle}>
              <CollapsibleTrigger className={sidebarCollapseTriggerStyle}>
                <Text variant="subtitle2" className="text-white">
                  {sidebar?.titleEn
                    ? getTextByLanguage(
                        sidebar?.titleEn || '',
                        sidebar?.titleNp || ''
                      )
                    : sidebar.title}
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
          <Link
            key={sidebar.path}
            className={`${computedSidebarLinkStyle} ${
              isActive ? 'bg-navy-24' : ''
            }`}
            to={sidebar.path}
          >
            <Text variant="subtitle2" className="text-white">
              {sidebar?.titleEn
                ? getTextByLanguage(
                    sidebar?.titleEn || '',
                    sidebar?.titleNp || ''
                  )
                : sidebar.title}
            </Text>
          </Link>
        )
      })}
    </aside>
  )
}

export default Sidebar
