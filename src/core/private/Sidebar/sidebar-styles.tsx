import { Link } from "react-router-dom";
import { Box, Text } from "../../../components/core";
import { Panel } from "../../../components/derived";
// import { LIGHT_THEME_ID } from '../../../theme';
// import { coolGray } from '../../../theme/colors';
import styled, { css, DefaultTheme } from "styled-components";
import { LIGHT_COLOR_THEME } from "../../../theme";
interface Props {
  inner: string;
  toggle?: boolean;
  ariaExpanded?: boolean;
}
export const SidebarPanel = styled(Panel) <Partial<Props>>`
  margin-left: ${(props) => props.toggle && "calc(-1 * var(--sidebar-width))"};
  background-color: #0d2344;
  display: flex;
  flex-direction: column;
`;

export const ItemContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 0 1.5rem;
`;

export const LeftContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;
export const RightContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const getBaseColor = (theme: DefaultTheme) => {
  // if (theme.id === LIGHT_THEME_ID) {
  // return theme.color.primary;
  // } else {
  //   return '#fff';
  // }
  return LIGHT_COLOR_THEME.primary;
};

const getBackgroundColor = (theme: DefaultTheme) => {
  // if (theme.id === LIGHT_THEME_ID) {
  // return theme.color.primary;
  // } else {
  //   return coolGray[600];
  // }
  return LIGHT_COLOR_THEME.primary;
};

export const ApplicationTitle = styled(Text)`
  color: ${(props) => getBaseColor(props.theme)};
  margin-left: 1rem;
  font-weight: 600;
`;

const defaultLinkStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 100%;
  font-size: 0.875rem;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: white;
  i,
  svg {
    display: inline-flex;
    align-items: center;
    font-size: 1.125rem;
    margin-right: 0.75rem;
  }
`;
const childrenStyle = css<Partial<Props>>`
  &:after {
    content: "\\e90e";
    display: block;
    font-family: "icomoon";
    margin-left: auto;
    font-size: 0.75rem;
  }
  ${(props) => {
    return (
      props.ariaExpanded &&
      `  color: ${getBaseColor(props.theme)} ;
       background-color:white;
    &:after {
      content: '\\e912';
    }

    `
    );
  }}
`;

export const Menu = styled.ul<Partial<Props>>`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  margin-top: 0.5rem;
  color: white;
  > li > a {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;

    font-size: 0.875rem;
    &:hover {
      color: ${(props) => getBaseColor(props.theme)};
    }

    &.active {
      color: ${(props) => getBaseColor(props.theme)};
      // background-color: ${(props) => getBaseColor(props.theme)};
      // border-radius: 0.25rem 0.25rem 0 0;
    }
  }
`;
export const NestedMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ;
  > li > a {
    padding: 0.75rem 1rem 1rem 3rem;
    position: relative;

    &:hover {
      color: ${(props) => getBaseColor(props.theme)};
    }

    &.active {
      background-color: ${(props) => getBackgroundColor(props.theme)};
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
`;

export const MenuItem = styled(Link) <Partial<Props>>`
  ${defaultLinkStyle}
`;
export const CollapseToggler = styled.a<Partial<Props>>`
  ${defaultLinkStyle};

  ${childrenStyle};
`;

export const Icon = styled.i`
  font-size: 1.25rem;
  margin-right: 0.7rem;
`;
