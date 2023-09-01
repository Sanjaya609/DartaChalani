import React from 'react';
import styled from 'styled-components';
import { Box } from '../core';

interface Props {
  children?: React.ReactNode;
}

const Wrapper = styled(Box)`
  height: 100%;
  overflow: hidden;
`;

function WrapperLayout({ children }: Props): React.ReactElement {
  return <Wrapper>{children}</Wrapper>;
}

export default WrapperLayout;
