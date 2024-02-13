import { IModuleSetupTableData } from '@/core/private/Security/ModuleSetup/schema/moduleSetup.interface'
import { routePaths } from '@/router'
import { IInitResponse } from '@/service/oauth/oauth.interface'
import { useGetInitData } from '@/service/oauth/oauth.query'
import TokenService from '@/service/token/token.service'
import {
  IModulePropsFromURL,
  getFlatDeepModuleList,
  getModulePropsFromURL,
} from '@/utility/module/get-module-by-url-or-code'

import React, { FC, useContext, useEffect, useMemo } from 'react'

const AuthContext = React.createContext<AuthProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  initData: null,
  flatModuleList: [],
  initDataFetching: false,
})

interface AuthProps {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  initData: IInitResponse | null
  flatModuleList: IModuleSetupTableData[]
  flatModulePropsFromURL?: Record<
    ValueOf<typeof routePaths>,
    IModulePropsFromURL
  >
  initDataFetching: boolean
}

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    TokenService.getAccessToken()
  )
  const { data: initData = null, isFetching: initDataFetching } =
    useGetInitData(isAuthenticated)

  const flatModuleList = useMemo(
    () => getFlatDeepModuleList(initData?.moduleList || []),
    [initData]
  )

  const flatModulePropsFromURL = useMemo(
    () => getModulePropsFromURL(flatModuleList),
    [flatModuleList]
  )

  const providerValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      initData,
      initDataFetching,
      flatModuleList,
      flatModulePropsFromURL,
    }),
    [isAuthenticated, initData, initDataFetching]
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
