import { ButtonHTMLAttributes } from 'react';
import { Collapse as RCollapse, CollapseProps } from 'reactstrap';
import styled from 'styled-components';
import { BiCaretDownCircle, BiCaretUpCircle } from 'react-icons/bi';
import { Box, Button, FlexBox } from '../../../core';
interface CollapseProperties extends CollapseProps {
  children?: React.ReactNode;
}
export default function CollapseButton(props: CollapseProperties) {
  return <RCollapse {...props} />;
}
interface CollapseHeaderProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  count?: number;
  active: boolean;
}
const StyledButton = styled(Button)<Partial<CollapseHeaderProperties>>`
  // width: 100%;
  display: block;
  padding: 0.375rem;
  background-color: ${(props) => (!props.active ? '#1565c0' : 'white')};
  color: ${(props) => (!props.active ? 'white' : '#1565c0')};
  margin-top: 1.5rem;
  &:focus {
    box-shadow: none;
  }
  &:hover {
    color: ${(props) => (!props.active ? 'white' : '#1565c0')};
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const TextBox = styled(Box)<Partial<CollapseHeaderProperties>>`
  font-size: 0.875rem;
  font-weight: 600;
  padding-left: 0.5rem;
`;

const CountBox = styled(FlexBox)`
  color: red;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-left: 1rem;
  line-height: 1;
`;
export function CollapseHeader({ title, count, ...args }: CollapseHeaderProperties) {
  return (
    <StyledButton {...args} className={`btn ${args?.className || ''}`}>
      <FlexBox align="center">
        {!args.active ? <BiCaretUpCircle /> : <BiCaretDownCircle />}
        <FlexBox className="flex-grow-1">
          <TextBox>{title}</TextBox>
          {count && (
            <CountBox align="center" justify="center">
              {count}
            </CountBox>
          )}
        </FlexBox>
      </FlexBox>
    </StyledButton>
  );
}
