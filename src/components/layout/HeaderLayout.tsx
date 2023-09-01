import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Box, FlexBox } from '../core';
import { LIGHT_COLOR_THEME } from '../../theme';

interface Props {
  children?: React.ReactNode;
  className?: string;
  tab?: boolean;
  breadcrumb?: boolean;
}

const Header = styled(Box)<Partial<Props>>`
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: ${(props) => {
      return props.className === 'withTab' ? '0rem' : '.75rem';
    }}
    4rem;
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
  }
  background-color: ${LIGHT_COLOR_THEME.surface};
  border-bottom: 1px solid ${LIGHT_COLOR_THEME.border};
`;

export default function HeaderLayout(props: Props) {
  const { className } = props;
  return (
    <Header className={classnames(className, { withTab: props.tab })}>
      <FlexBox align="center" justify="space-between" className="w-100">
        {props.children}
      </FlexBox>
    </Header>
  );
}
