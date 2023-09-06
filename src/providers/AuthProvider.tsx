import TokenService from '@/service/token/token.service'

import React, { FC, useContext, useEffect, useMemo } from 'react'

const AuthContext = React.createContext<AuthProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
})

interface AuthProps {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true)

  // useEffect(() => {
  //   const storageData = TokenService.getAccessToken()
  //   setIsAuthenticated(!!storageData?.accessToken)
  // }, [])

  const providerValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
    }),
    [isAuthenticated]
  )

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
