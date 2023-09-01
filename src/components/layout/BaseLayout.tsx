import React from 'react';
import styled from 'styled-components';
import { Box } from '../core';

interface Props {
  children?: React.ReactNode;
}
const Base = styled(Box)`
  height: 100%;
  display: flex;
  width: 100%;
`;
function BaseLayout({ children }: Props): React.ReactElement {
  return <Base>{children}</Base>;
}

export default BaseLayout;
