import { RoutePaths } from '@/router'
import { useAuth } from '@/providers'

interface IGetScreenTitle {
  url: RoutePaths
  parentURL?: RoutePaths
}
const useGetScreenTitle = (props: IGetScreenTitle) => {
  const { url, parentURL } = props
  const { flatModulePropsFromURL } = useAuth()

  return {
    nameEnglish: flatModulePropsFromURL?.[url]?.moduleNameEnglish || '',
    nameNepali: flatModulePropsFromURL?.[url]?.moduleNameNepali || '',
    parentNameEnglish: parentURL
      ? flatModulePropsFromURL?.[parentURL]?.moduleNameEnglish
      : '',
    parentNameNepali: parentURL
      ? flatModulePropsFromURL?.[parentURL]?.moduleNameNepali
      : '',
  }
}

export default useGetScreenTitle
