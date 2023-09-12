import { Icon } from '@/components/ui'
import { Link } from '@/router'
import { TFuncKey } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { sidebarNavList } from './sidebar.data'

const MainSidebar = () => {
  const { t } = useTranslation()
  return (
    <>
      <aside className="h-full w-[3.5rem] shrink-0 bg-navy-24">
        <div className="flex w-full flex-col items-center justify-center">
          {sidebarNavList.map((nav) => (
            <Link
              key={nav.path}
              title={t(nav.title) as TFuncKey<'translation'>}
              className="flex w-full cursor-pointer justify-center py-4 hover:bg-primary"
              to={nav.path}
            >
              <Icon icon={nav.icon} size={16} color={'text-white'} />
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}

export default MainSidebar
