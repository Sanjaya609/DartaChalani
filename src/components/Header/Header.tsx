// import logoImg from '../../assets/image/info-logo.png';
import { ReactElement, useState } from "react";
import { DropdownToggle } from "reactstrap";
import styled from "styled-components";
import logoImg from "../../assets/image/nepal-gov.png";
import { getBaseColor } from "../Table";
import { Box, Image, Text } from "../core";
// import SidebarToggler from '../Sidebar/SidebarToggler';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/ApplicationProvider";
import { publicRoutePath } from "../../routes/public/publicRoutePath";
import SidebarToggler from "../Sidebar/SidebarToggler";
import { Dropdown, DropdownItem, DropdownMenu } from "../utils";
import ProfileModal from "./Profile/ProfileModal";
import ProfileImage from "./ProfileImage/ProfileImage";
import { headerStyles } from "./headerProps";
// import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { InitDataSchema } from "../../core/private/Private.schema";
import { switchLanguage } from "../../i18/i18";
import { Switch } from "../core/FormElement";
import UpdatePasswordModal from "./UpdatePassword/UpdatePasswordModal";

const Head = styled(Box)`
  height: var(--header-height);
  background-color: ${headerStyles.backgroundColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding-right: 1rem;
`;
const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderTitle = styled(Text)`
  color: ${(props) => getBaseColor(props.theme)};
  font-weight: 600;
  font-size: 1.125rem;
`;

const LeftContainer = styled(Box)`
  display: flex;
  align-items: center;
  // flex-grow: 1;
`;
const RightContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const ApplicationTitle = styled(Text)`
  color: white;
  margin-left: 1rem;
`;

interface HeaderProps {
  userData: InitDataSchema | null;
  active: any;
  setActive: any;
}

function Header({ active, setActive, userData }: HeaderProps): ReactElement {
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState<boolean>(false)
  const { setToggle } = useAuth();
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <HeaderContainer>
          <LeftContainer component="div">
            <SidebarToggler icon="ic-menu" toggleSidebar={setToggle} />

            <Image src={logoImg} width={"32"} height={"32"} />
            <ApplicationTitle variant="h6">
              {t('common.projectTitle')}
            </ApplicationTitle>
          </LeftContainer>
          <RightContainer>
            <Box className="z-50 mr-4 d-flex">
              <Text
                typeface="semiBold"
                variant="display1"
                className="text-white mx-2"
              >
                नेपा
              </Text>
              <Switch checked={i18next.language === 'en'} onChange={() => {
                if (i18next.language === 'en') {
                  switchLanguage('np')
                } else {
                  switchLanguage('en')
                }
              }} />
              <Text
                typeface="semiBold"
                variant="display1"
                className="text-white mx-2"
              >
                En
              </Text>
            </Box>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => toggleDropdown(!dropdownOpen)}
            >
              <DropdownToggle color="default" caret className="p-0 text-white">
                <ProfileImage
                  width={"40"}
                  height={"40"}
                  className="rounded-circle"
                  onClick={() => toggleDropdown(!dropdownOpen)}
                />

                <Text
                  typeface="semiBold"
                  variant="display1"
                  className="text-white mx-2"
                >
                  {userData?.user?.fullNameNepali}
                </Text>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setIsOpen(!isOpen)}>
                  {t('profile')}
                </DropdownItem>
                <DropdownItem onClick={() => setUpdatePasswordOpen(!updatePasswordOpen)}>
                  पासवर्ड परिवर्तन गर्नुहोस्
                </DropdownItem>
                <DropdownItem divider className="m-0" />
                <DropdownItem
                  onClick={() => {
                    setIsAuthenticated(false);
                    localStorage.clear();
                    navigate(publicRoutePath.login);
                  }}
                >
                  {t('logout')}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </RightContainer>
        </HeaderContainer>
      </Head>
      <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <UpdatePasswordModal isOpen={updatePasswordOpen} setIsOpen={setUpdatePasswordOpen} />
    </>
  );
}

export default Header;
