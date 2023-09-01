import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '../core';

interface Props {
  children?: React.ReactNode;
  horizontal?: boolean;
  className?: string;
}
const Flex = styled(FlexBox)`
  height: 100%;
  width: 100%;
`;

function FlexLayout(props: Props): React.ReactElement {
  return (
    <Flex className={props.className} direction={props.horizontal ? 'row' : 'column'}>
      {props.children}
    </Flex>
  );
}

export default FlexLayout;
