import styled from 'styled-components';
import { Nav as RNav, NavItem as RNavItem, NavLink as RNavLink } from 'reactstrap';
import { LIGHT_COLOR_THEME } from '../../../theme';

export const Nav = styled(RNav)`
  border: none;
  flex-wrap: nowrap;
`;
export const NavItem = styled(RNavItem)`
  &:not(:last-child) {
    .nav-link {
      margin-right: 1.5rem;
    }
  }
`;
export const NavLink = styled(RNavLink)`
  background: none;
  border: none;
  color: ${LIGHT_COLOR_THEME.onSurface};
  font-size: 1rem;
  padding: 0.75rem 0;
  font-weight: 400;
  cursor: pointer;
  &.active {
    color: ${LIGHT_COLOR_THEME.primary};
    background: none;
    font-weight: 600;
    border-bottom: 2px solid ${LIGHT_COLOR_THEME.primary};
  }
`;
