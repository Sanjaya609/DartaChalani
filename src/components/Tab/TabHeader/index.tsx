import React from "react";
import classNames from "classnames";
import { Nav, NavItem, NavLink } from "./tab-styles";
import { Box, FlexBox } from "../../core";
import { useTranslation } from "react-i18next";

export interface HeaderTabObject {
  headerName: string;
  tab: string;
  className?: string;
  icon?: React.ReactElement;
}
interface TabHeaderProps {
  headerTab: Array<HeaderTabObject>;
  toggle: (tab: string) => void;
  activeTab?: string;
  className?: string;
}

function TabHeader(props: TabHeaderProps) {
  const { headerTab, toggle, activeTab, className } = props;
  const { t } = useTranslation();
  return activeTab ? (
    <Nav className={classNames(className)}>
      {headerTab.length &&
        headerTab.map((data: HeaderTabObject, index: number) => (
          <NavItem key={index}>
            <NavLink
              className={classNames({ active: activeTab === data.tab })}
              onClick={() => {
                toggle(data.tab);
              }}
            >
              <FlexBox>
                {data.icon && (
                  <Box component="span" className="mr-2">
                    {data.icon}
                  </Box>
                )}
                {t(`${data.headerName}`)}
              </FlexBox>
            </NavLink>
          </NavItem>
        ))}
    </Nav>
  ) : (
    <>Test</>
  );
}

export default TabHeader;
