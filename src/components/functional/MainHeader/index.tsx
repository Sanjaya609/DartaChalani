import { Link } from 'react-router-dom'
import Logo from '@/assets/img/logo.png'
import { Flexbox, Icon, Image } from '@/components/ui'
import MenuOverlay from '@/components/functional/MainSidebar/MenuOverlay/MenuOverlay'
import { Text } from '@/components/ui/core/Text'
import { useTranslation } from 'react-i18next'
import userImg from '@/assets/img/user.jpg'
import { switchLanguage } from '@/lib/i18n/i18n'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { LogOut } from 'lucide-react'
import { handleLogout } from '@/lib/api-request/api-schema'
import { useAuth } from '@/providers'

const MainHeader = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const { setIsAuthenticated } = useAuth()
  return (
    <div className="flex">
      <MenuOverlay />
      <header className="flex min-h-[3.5rem] grow items-center justify-between bg-navy-40 px-6">
        <Flexbox align="center" className="h-full">
          <Link to="/">
            <Image src={Logo} alt="Govt. of Nepal" width={40} height={40} />
          </Link>
          <Text className="ml-4" color="text-white" variant="h6">
            {t('projectTitle')}
          </Text>
        </Flexbox>

        <Flexbox align="center">
          <div>
            <Dropdown
              triggerElement={
                <Image
                  src={userImg}
                  alt="user"
                  className="mr-2 inline-block h-8 w-8 cursor-pointer rounded-full"
                />
              }
            >
              <Dropdown.DropdownMenuItem
                onClick={() => {
                  handleLogout()
                  setIsAuthenticated(false)
                }}
                className="cursor-pointer hover:bg-red-88"
              >
                <Flexbox
                  align="center"
                  justify="space-between"
                  className="w-full"
                >
                  <Text>Logout</Text>
                  <Icon icon={LogOut} />
                </Flexbox>
              </Dropdown.DropdownMenuItem>
            </Dropdown>
          </div>

          <Text
            title={language === 'en' ? 'English' : 'Nepali'}
            className="cursor-pointer border-l-2 pl-2 text-white "
            onClick={() => switchLanguage()}
          >
            {language === 'en' ? 'EN' : 'NP'}
          </Text>
        </Flexbox>
      </header>
    </div>
  )
}

export default MainHeader
