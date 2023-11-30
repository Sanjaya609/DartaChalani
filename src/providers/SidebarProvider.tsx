import React, { useContext } from 'react'
import { useAuth } from './AuthProvider'
import {
  ISidebarNavList,
  sidebarNavList,
} from '@/components/functional/MainSidebar/sidebar.data'
import { PRIVILEGEENUM } from '@/utility/enums/privilege.enum'

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
  const { flatModulePropsFromURL } = useAuth()
  const privilegedSidebarNavList = React.useMemo(() => {
    return sidebarNavList.filter((navList) => {
      return !!navList?.bypass || flatModulePropsFromURL?.[navList.path]
        ? !flatModulePropsFromURL?.[navList.path]?.isConfigurable ||
            flatModulePropsFromURL?.[navList?.path]?.resourceResponses?.length
        : false
    })
  }, [flatModulePropsFromURL])

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen: (state?: boolean) => setIsOpen(state || !isOpen),
      privilegedSidebarNavList,
    }),
    [isOpen, privilegedSidebarNavList]
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
