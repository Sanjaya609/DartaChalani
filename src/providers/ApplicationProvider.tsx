import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { FC, useContext, useEffect, useMemo } from "react";
import { InitDataSchema } from "../core/private/Private.schema";
import { getToken } from "../utils/tokenService";

export interface IUserInfoexport {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
  salt: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



interface AuthProps {
  isAuthenticated: boolean;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userData: null | InitDataSchema;
  setUserData: React.Dispatch<React.SetStateAction<InitDataSchema | null>>;
  subSectorData: null | unknown
  setSubSectorData: React.Dispatch<React.SetStateAction<unknown | null>>;
}

const AuthContext = React.createContext<AuthProps>({
  isAuthenticated: true,
  toggle: false,
  setToggle: () => { },
  setIsAuthenticated: () => { },
  userData: null,
  setUserData: () => { },
  subSectorData: null,
  setSubSectorData: () => { },
});


const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      // since we do not need the cache of mutation, we are disable cache of mutation
      cacheTime: 0,
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // Time to stale request and re-fetch in background
      staleTime: 5 * 1000,
    },
  },
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [toggle, setToggle] = React.useState(false);
  const [userData, setUserData] = React.useState<InitDataSchema | null>(null);
  const [subSectorData, setSubSectorData] = React.useState<unknown | null>(null);

  useEffect(() => {
    const storageData = getToken();
    if (storageData === null) {
      setIsAuthenticated(false);
    }
  }, []);


  const providerValue = useMemo(
    () => ({
      isAuthenticated,
      toggle,
      setToggle,
      setIsAuthenticated,
      setUserData,
      userData,
      subSectorData,
      setSubSectorData,
    }),
    [isAuthenticated, toggle, userData, subSectorData]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      <QueryClientProvider client={queryClient}>{children}      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
