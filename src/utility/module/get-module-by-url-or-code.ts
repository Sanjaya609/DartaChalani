import { IModuleSetupTableData } from '@/core/private/Security/ModuleSetup/schema/moduleSetup.interface'

export interface IModulePropsFromURL extends IModuleSetupTableData {
  parentMenuData?: IModuleSetupTableData
}

export const getFlatDeepModuleList = (moduleList: IModuleSetupTableData[]) => {
  let flattenedModuleList: IModuleSetupTableData[] = []
  moduleList.forEach((module) => {
    flattenedModuleList.push(module)
    if (Array.isArray(module.childModuleList)) {
      flattenedModuleList = flattenedModuleList.concat(
        getFlatDeepModuleList(module.childModuleList)
      )
    }
  })
  return flattenedModuleList
}

export const getModulePropsFromURL = (moduleList: IModuleSetupTableData[]) => {
  return moduleList.reduce<Record<string, IModulePropsFromURL>>(
    (accumulatedReducedModule, module) => {
      const reducedModule = { ...accumulatedReducedModule }
      if (module?.parentModuleId) {
        const parentData = moduleList.find(
          (parent) => module.parentModuleId === parent.id
        )
        if (parentData) {
          reducedModule[module.url] = {
            ...module,
            parentMenuData: parentData, // to only store required parent data
          }
        } else {
          reducedModule[module.url] = module
        }
      } else {
        reducedModule[module.url] = module
      }
      return reducedModule
    },
    {}
  )
}

// TODO: check privilege if necessary
export const getRedirectURLPathOfScreen = (
  flatModulePropsFromURL?: IModulePropsFromURL
) => {
  let url = flatModulePropsFromURL?.url || '/'
  if (flatModulePropsFromURL?.childModuleList?.length) {
    const { childModuleList } = flatModulePropsFromURL
    if (!childModuleList[0].childModuleList?.length) {
      url = childModuleList[0].url
    } else if (
      childModuleList[0]?.childModuleList?.length &&
      childModuleList[0]?.childModuleList?.[0]
    ) {
      url = getRedirectURLPathOfScreen(childModuleList[0].childModuleList?.[0])
    }
  }

  return url
}
