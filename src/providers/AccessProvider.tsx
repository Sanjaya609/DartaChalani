import React, { FC, useCallback, useContext, useEffect, useMemo } from "react";
import { ChildrenModuleList, ModuleList } from "../core/private/Private.schema";
import { useAuth } from "./ApplicationProvider";
import { useLocation } from "react-router-dom";

interface AccessProps {
    activeMenu: null | ModuleList,
    checkCreateAccess: () => boolean,
    checkUpdateAccess: () => boolean
}

const AccessContext = React.createContext<AccessProps>({
    activeMenu: null,
    checkCreateAccess: () => true,
    checkUpdateAccess: () => true
});


const findChildMenuByPath = (menuList: ChildrenModuleList[] | undefined, path: string) => {
    if (menuList) {
        for (let i = 0; i < menuList.length; i++) {
            if (menuList[i].url === path) {
                return menuList[i]
            }
        }
    }


}
const findMenuByPath = (menuList: ModuleList[], path: string) => {
    for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].url === path) {
            return menuList[i]
        }
        if (menuList[i]['childrenModuleList']) {
            findChildMenuByPath(menuList[i]['childrenModuleList'], path);
        }
    }

}



const AcessProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeMenu, setActiveMenu] = React.useState<ModuleList | null>(null);
    const { userData } = useAuth();
    const location = useLocation()

    useEffect(() => {
        if (userData?.moduleList && location.pathname) {
            let data = findMenuByPath(userData?.moduleList, location.pathname)
            if (data) {
                setActiveMenu(data)
            } else {
                setActiveMenu(null)
            }
        }
    }, [location.pathname, userData?.moduleList])
    const checkCreateAccess = useCallback( (): boolean => {
        if (activeMenu?.privilegeList.some(el => el.toLowerCase() === 'create')) {
            return true
        }
        return false
    },[activeMenu?.privilegeList])
    const checkUpdateAccess = useCallback((): boolean => {
        if (activeMenu?.privilegeList.some(el => el.toLowerCase() === 'update')) {
            return true
        }
        return false
    },[activeMenu?.privilegeList])
    const providerValue = useMemo(
        () => ({
            checkCreateAccess,
            checkUpdateAccess,
            activeMenu
        }),
        [activeMenu, checkCreateAccess,checkUpdateAccess]
    );

    return <AccessContext.Provider value={providerValue}>
        {children}
    </AccessContext.Provider>;
}

export const useAccess = () => {
    return useContext(AccessContext);
};

export default AcessProvider;
