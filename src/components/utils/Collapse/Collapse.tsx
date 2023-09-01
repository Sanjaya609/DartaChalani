import { ButtonHTMLAttributes } from 'react';
import { Collapse as RCollapse, CollapseProps } from 'reactstrap';
import { FlexBox, Text } from '../../core';
import Button from '../../derived/Buttons/Buttons';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styled from 'styled-components';
import { blue } from '../../../theme/colors';
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
  background-color: ${blue[100]};
  color: ${blue[900]};
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
