import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import {
  ApplicationTitle,
  ItemContainer,
  LeftContainer,
  Menu,
  RightContainer,
  SidebarPanel,
} from "./sidebar-styles";
import logoImg from "../../../assets/image/nepal-gov.png";
import { useTranslation } from "react-i18next";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { DropdownToggle } from "reactstrap";
import ProfileModal from "../../../components/Header/Profile/ProfileModal";
import ProfileImage from "../../../components/ProfileImage/ProfileImage";
import { useSidebarRouteList } from "../../../components/Sidebar/SidebarRoutes";
import { Box, FlexBox, Image, Text } from "../../../components/core";
import Button from "../../../components/derived/Buttons/Buttons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "../../../components/utils";
import { useAuth } from "../../../providers/ApplicationProvider";
import { coolGray } from "../../../theme/colors";
import { privateRoutePath } from "../../../routes/private/privateRoutePath";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  // const isDark = false;
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [activeOption, setActiveOption] = useState<string>("")
  const SidebarRoutes = useSidebarRouteList(userData?.moduleList ?? [])
  const [openedSidebar, setOpenedSidebar] = React.useState({
    parent: "",
    child: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const { toggle, setToggle } = useAuth();
  const { t } = useTranslation();
  return (
    <>
      <SidebarPanel toggle={toggle}>
        <ItemContainer className="border-bottom">
          <LeftContainer>
            <FlexBox align="center" className="cursor-pointer" >
              <Image src={logoImg} width={"32"} height={"32"} onClick={() => {
                navigate(privateRoutePath.dashboard)
              }} />
              <ApplicationTitle variant="h5">
                {t("common.projectTitle")}
              </ApplicationTitle>
            </FlexBox>
            {!toggle && (
              <Button
                className="btn cursor-pointer px-0"
                onClick={() => {
                  setToggle((tg) => !tg);
                }}
              >
                <AiOutlineDoubleLeft size={20} color={coolGray[600]} />
              </Button>
            )}
          </LeftContainer>
        </ItemContainer>
        <Menu>
          {SidebarRoutes.map((item) => {
            const active = item.key === activeOption;
            return (
              <SidebarItem
                key={item.key}
                openedSidebar={openedSidebar}
                elem={item}
                setOpenedSidebar={setOpenedSidebar}
                setActiveOption={setActiveOption}
                activeOption={activeOption}
                active={active}
              />
            );
          })}
        </Menu>
        <FlexBox>
          <ItemContainer>
            <RightContainer>
              <Dropdown
                isOpen={dropdownOpen}
                toggle={() => toggleDropdown(!dropdownOpen)}
              >
                <DropdownToggle color="link" className="p-0">
                  <ProfileImage
                    width={"32"}
                    height={"32"}
                    className="rounded-circle"
                    onClick={() => toggleDropdown(!dropdownOpen)}
                    image={""}
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setIsOpen(!isOpen)}>
                    Profile
                  </DropdownItem>
                  <DropdownItem divider className="m-0" />
                  <DropdownItem onClick={() => { }}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Box className="ml-3">
                <Text
                  typeface="semiBold"
                  variant="display1"
                  color={coolGray[600]}
                >
                  {userData?.user?.fullNameNepali}
                </Text>
                <Text variant="display2" color={coolGray[600]}>
                  {userData?.user?.roleNameNepali}
                </Text>
              </Box>
            </RightContainer>
          </ItemContainer>
        </FlexBox>
      </SidebarPanel >
      <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Sidebar;
