import Logo from '@/assets/img/logo.png'
import { Flexbox, Icon, Image } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { useSideBarData } from '@/providers/SidebarProvider'
import { Link } from '@/router'
import { TFuncKey, TFuncReturn } from 'i18next'
import { useTranslation } from 'react-i18next'
import { sidebarNavList } from '../sidebar.data'
import { menuOverlayAside } from './menuoverlay.styles'
import { useOnClickOutside } from 'usehooks-ts'
import { useRef } from 'react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'

const OverLayIcon = () => (
  <svg
    stroke="currentColor"
    fill="#fff"
    stroke-width="0"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"></path>
  </svg>
)

const MenuOverlay = () => {
  const { t } = useTranslation()
  const { isOpen, setIsOpen } = useSideBarData()

  const asideRef = useRef<HTMLElement>(null)
  useOnClickOutside(asideRef, () => {
    isOpen && setIsOpen()
  })

  const computedAsideMenuOverlayClass = getComputedClassNames(
    menuOverlayAside,
    'transition-all duration-200 translate-x-[-16rem]',
    { 'transform-none': isOpen }
  )

  return (
    <>
      <div
        onClick={() => setIsOpen()}
        className=" flex h-full w-[3.5rem] cursor-pointer items-center bg-navy-24 "
      >
        <div className="flex w-full justify-center">
          <OverLayIcon />
        </div>
      </div>

      <aside className={computedAsideMenuOverlayClass} ref={asideRef}>
        <div></div>

        <Flexbox align="center" className="p-4">
          <Image src={Logo} alt="Govt. of Nepal" width={40} height={40} />
          <Text className="ml-4" color="text-white" variant="h6">
            {t('projectTitle')}
          </Text>
        </Flexbox>

        {sidebarNavList.map((nav) => (
          <Link
            key={nav.path}
            className="group flex w-full cursor-pointer items-center px-3 py-4 transition-all hover:bg-primary"
            to={nav.path}
          >
            <Icon
              className="mr-2 group-hover:text-navy-16"
              icon={nav.icon}
              size={24}
              color={'text-white'}
            />

            <Text className="text-sm text-white">
              {t(nav.title) as TFuncKey<'translation'>}
            </Text>
          </Link>
        ))}
      </aside>
    </>
  )
}

export default MenuOverlay
