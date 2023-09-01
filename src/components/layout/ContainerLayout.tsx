import React from 'react';
import styled from 'styled-components';
import { Box } from '../core';

interface Props {
  children?: React.ReactNode;
  stretch?: boolean;
  centered?: boolean;
  className?: string;
}
const Container = styled(Box)<Props>`
  padding: 0 4rem;
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  ${(props) => props.stretch && `height: 100%;`}
  ${(props) =>
    props.centered
      ? ` 
      max-width: var(--app-max-width);
      margin: 0 auto;
    `
      : `  width: 100%;
  `}
`;

function ContainerLayout(props: Props): React.ReactElement {
  const { className, stretch, centered, children } = props;
  return (
    <Container className={className} stretch={stretch} centered={centered}>
      {children}
    </Container>
  );
}

export default ContainerLayout;
