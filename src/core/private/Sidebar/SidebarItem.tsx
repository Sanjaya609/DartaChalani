import React from "react";
import { useTranslation } from "react-i18next";
import { UncontrolledCollapse } from "reactstrap";
import { SidebarElementConfig } from "../../../components/Sidebar/SidebarRoutes";
import { CollapseToggler, MenuItem, NestedMenu } from "./sidebar-styles";

interface SidebarItemProps {
  elem: SidebarElementConfig;
  inner?: boolean;
  openedSidebar: {
    parent: string;
    child: string;
  };
  setOpenedSidebar: React.Dispatch<
    React.SetStateAction<{
      parent: string;
      child: string;
    }>
  >;
  activeOption: string
  setActiveOption: React.Dispatch<React.SetStateAction<string>>
  active: boolean
}

function SidebarItem({
  elem,
  inner,
  openedSidebar,
  setOpenedSidebar,
  activeOption,
  setActiveOption,
  active
}: SidebarItemProps) {
  const { t } = useTranslation();
  if (elem.children) {
    return (
      <li key={elem.key}>
        <CollapseToggler
          role="button"
          inner={"true"}
          aria-expanded={
            openedSidebar.parent === elem.key || openedSidebar.child === elem.key
          }
          className={
            openedSidebar.parent === elem.key || openedSidebar.child === elem.key ? 'active' : ''
          }
          id={elem.key}
          onClick={(e) => {
            e.stopPropagation();

            if (inner) {
              setOpenedSidebar({
                parent: openedSidebar.parent,
                child: openedSidebar.child === elem.key ? "" : elem.key,
              });
            } else {
              setOpenedSidebar({
                parent: elem.key === openedSidebar.parent ? "" : elem.key,
                child: "",
              });
            }
          }}
        >
          {elem.icon && <>{elem.icon}</>}
          {t(elem.title)}
        </CollapseToggler>
        <UncontrolledCollapse
          isOpen={
            openedSidebar.parent === elem.key || openedSidebar.child === elem.key
          }
          toggler={`#${elem.key}`}
        >
          <NestedMenu>
            {elem.children.map((item, index) => {
              const active = item.key === activeOption
              return (
                <SidebarItem
                  setOpenedSidebar={setOpenedSidebar}
                  openedSidebar={openedSidebar}
                  elem={item}
                  inner={true}
                  key={elem.key + index}
                  setActiveOption={setActiveOption}
                  activeOption={activeOption}
                  active={active}
                />
              );
            })}
          </NestedMenu>
        </UncontrolledCollapse>
      </li>
    );
  }

  return (
    <li key={elem.key} onClick={() => {
      if (activeOption !== elem.key) {
        setActiveOption(elem.key)
      }
    }} className={
      active ? 'bg-warning' : ''
    }>
      <MenuItem to={elem.path!}>
        {elem.icon && <>{elem.icon}</>}
        {t(elem.title)}
      </MenuItem>
    </li>
  );
}
export default SidebarItem;
