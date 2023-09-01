import React from 'react';
import styled from 'styled-components';
import { Box } from '../core';

interface Props {
  children?: React.ReactNode;
}

const Main = styled(Box)`
  height: 100%;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
function MainLayout({ children }: Props): React.ReactElement {
  return <Main component="main">{children}</Main>;
}

export default MainLayout;
