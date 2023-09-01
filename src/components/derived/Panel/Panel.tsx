import React from 'react';
import styled from 'styled-components';
import { Box } from '../../core';
import { Scrollable } from '../../core/Scrollable';

interface Props {
  children?: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}
const StyledPanel = styled(Box)<Props>`
  width: var(--sidebar-width);
  height: 100%;
  background-color: white;
  flex-shrink: 0;
  transition: margin 0.2s ease-in;
  ${(props) => props.scrollable && Scrollable}
`;

export default function Panel(props: Props) {
  return (
    <StyledPanel className={props.className} component="aside">
      {props.children}
    </StyledPanel>
  );
}
