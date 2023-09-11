import { Link } from 'react-router-dom'
import Logo from '@/assets/img/logo.png'
import { Flexbox, Image } from '@/components/ui'
import MenuOverlay from '@/components/functional/MainSidebar/MenuOverlay/MenuOverlay'
import { Text } from '@/components/ui/core/Text'
import { useTranslation } from 'react-i18next'

const MainHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="flex">
      <MenuOverlay />
      <header className="flex min-h-[3.5rem] grow items-center bg-navy-40 pl-6">
        <Flexbox align="center" className="h-full">
          <Link to="/">
            <Image src={Logo} alt="Govt. of Nepal" width={40} height={40} />
          </Link>
          <Text className="ml-4" color="text-white" variant="h6">
            {t('projectTitle')}
          </Text>
        </Flexbox>
      </header>
    </div>
  )
}

export default MainHeader
