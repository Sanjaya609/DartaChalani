import { Icon } from '@/components/ui'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { useSideBarData } from '@/providers/SidebarProvider'
import { Link, useLocation } from '@/router'
import { TFuncKey } from 'i18next'
import { useTranslation } from 'react-i18next'

const MainSidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { privilegedSidebarNavList } = useSideBarData()

  return (
    <>
      <aside className="h-full w-[3.5rem] shrink-0 bg-navy-24">
        <div className="flex w-full flex-col items-center justify-center">
          {privilegedSidebarNavList.map((nav) => {
            const isActive = location.pathname.includes(nav.path)
            return (
              <Link
                key={nav.path}
                title={
                  nav?.titleEn
                    ? getTextByLanguage(nav?.titleEn || '', nav?.titleNp || '')
                    : (t(nav.title) as TFuncKey<'translation'>)
                }
                className={`flex w-full cursor-pointer justify-center py-4 hover:bg-primary ${
                  isActive ? 'bg-primary' : ''
                }`}
                to={nav.path}
              >
                <Icon icon={nav.icon} size={16} color={'text-white'} />
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}

export default MainSidebar
