import React from 'react'

interface ISidebarContext {
  isOpen: boolean
  setIsOpen: (isOpen?: boolean) => void
}

export const SidebarContext = React.createContext<ISidebarContext>({
  isOpen: false,
  setIsOpen: () => {},
})

interface Props {
  children: React.ReactNode
}
export const SidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen: (state?: boolean) => setIsOpen(state || !isOpen),
    }),
    [isOpen]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
