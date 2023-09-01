import React from 'react';
import {
  Dropdown as RDropdown,
  DropdownToggle as RDropdownToggle,
  DropdownMenu as RDropdownMenu,
  DropdownItem as RDropdownItem,
  DropdownProps,
  DropdownToggleProps,
  DropdownMenuProps,
  DropdownItemProps
} from 'reactstrap';

interface DropdownProperties extends DropdownProps {
  children?: React.ReactNode;
}
interface DropdownToggleProperties extends DropdownToggleProps {
  children?: React.ReactNode;
}
interface DropdownItemProperties extends DropdownItemProps {
  children?: React.ReactNode;
}
interface DropdownMenuProperties extends DropdownMenuProps {
  children?: React.ReactNode;
}
export default function Dropdown(props: DropdownProperties) {
  return <RDropdown {...props} />;
}
function DropdownToggle(props: DropdownToggleProperties) {
  return <RDropdownToggle {...props} />;
}
function DropdownMenu(props: DropdownMenuProperties) {
  return <RDropdownMenu {...props} />;
}
function DropdownItem(props: DropdownItemProperties) {
  return <RDropdownItem {...props} />;
}

export { DropdownToggle, DropdownMenu, DropdownItem };
