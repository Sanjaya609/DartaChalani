import React from 'react';
// import EmptyState from '@/assets/image/empty-state.png';
import EmptyState from './../../assets/image/empty-state.png';
import { FlexBox, Image, Text } from '../core';
import styled from 'styled-components';
interface Props {
  title: string;
  description?: string;
}

const StyledDescription = styled(Text)`
  margin-top: 0.5rem;
  color: 'gray';
  font-size: 0.75rem;
`;
export default function NoDataFound(props: Props) {
  const { title, description } = props;
  return (
    <FlexBox direction="row" align="center">
      <Image src={EmptyState} alt='emplty' />
      <Text className="mt-3">{title}</Text>
      {description && <StyledDescription variant="p">{description}</StyledDescription>}
    </FlexBox>
  );
}
