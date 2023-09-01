import { ButtonHTMLAttributes } from 'react';
import { Collapse as RCollapse, CollapseProps, Button } from 'reactstrap';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styled from 'styled-components';
import { FlexBox,Text } from '../../../core';
interface CollapseProperties extends CollapseProps {
  children?: React.ReactNode;
}
export default function Collapse(props: CollapseProperties) {
  return <RCollapse {...props} />;
}
interface CollapseHeaderProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  count?: number;
  active: boolean;
}
const StyledButton = styled(Button)<Partial<CollapseHeaderProperties>>`
  width: 100%;
  display: block;
  background-color: ${(props) => (props.active ? '#fdf9fa' : 'white')};
  &:focus {
    box-shadow: none;
  }
`;

const CountBox = styled(FlexBox)`
  background-color: 'blue';
  color: 'blue';
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-left: 1rem;
  line-height: 1;
`;
export function CollapseHeader({ title, count, ...args }: CollapseHeaderProperties) {
  return (
    <StyledButton {...args} className={`btn ${args?.className || ''}`}>
      <FlexBox>
        <FlexBox className="flex-grow-1">
          <Text variant="p">{title}</Text>
          {count && (
            <CountBox align="center" justify="center">
              {count}
            </CountBox>
          )}
        </FlexBox>
        {args.active ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </FlexBox>
    </StyledButton>
  );
}
