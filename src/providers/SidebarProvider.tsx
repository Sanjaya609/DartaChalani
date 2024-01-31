import {
  ISidebarNavList,
  sidebarNavList,
} from '@/components/functional/MainSidebar/sidebar.data'
import React, { useContext } from 'react'
import { useAuth } from './AuthProvider'
import { Ticket } from 'phosphor-react'
import { getTextByLanguage } from '@/lib/i18n/i18n'

interface ISidebarContext {
  isOpen: boolean
  setIsOpen: (isOpen?: boolean) => void
  privilegedSidebarNavList: ISidebarNavList[]
}

export const SidebarContext = React.createContext<ISidebarContext>({
  isOpen: false,
  setIsOpen: () => {},
  privilegedSidebarNavList: [],
})

interface Props {
  children: React.ReactNode
}
export const SidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { flatModulePropsFromURL, initData } = useAuth()

  const dynamicSidebarNavList = React.useMemo<ISidebarNavList[]>(() => {
    return initData?.moduleList?.length
      ? initData?.moduleList
          ?.filter(
            (module) => module.dynamicField || module.dynamicFormApplicable
          )
          .map((module) => ({
            ...module,
            titleEn: module.moduleNameEnglish,
            titleNp: module.moduleNameNepali,
            icon: Ticket,
            path: module.url,
            title: getTextByLanguage(module.moduleNameEnglish,module.moduleNameNepali),
          }))
      : []
  }, [initData?.moduleList])

  const privilegedSidebarNavList = React.useMemo(() => {
    return sidebarNavList
      .filter((navList) => {
        return !!navList?.bypass || flatModulePropsFromURL?.[navList.path]
          ? !flatModulePropsFromURL?.[navList.path]?.isConfigurable ||
              flatModulePropsFromURL?.[navList?.path]?.resourceResponses?.length
          : false
      })
      .map((navList) => ({
        ...navList,
        titleEn: flatModulePropsFromURL?.[navList.path]?.moduleNameEnglish,
        titleNp: flatModulePropsFromURL?.[navList.path]?.moduleNameNepali,
        path:
          flatModulePropsFromURL?.[navList.path]?.dynamicField ||
          flatModulePropsFromURL?.[navList.path]?.dynamicFormApplicable
            ? flatModulePropsFromURL?.[navList.path]?.url
            : navList.path,
      }))
  }, [flatModulePropsFromURL])

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen: (state?: boolean) => setIsOpen(state || !isOpen),
      privilegedSidebarNavList: [
        ...privilegedSidebarNavList,
        ...dynamicSidebarNavList,
      ],
    }),
    [isOpen, privilegedSidebarNavList, dynamicSidebarNavList]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSideBarData = () => {
  return useContext(SidebarContext)
}
