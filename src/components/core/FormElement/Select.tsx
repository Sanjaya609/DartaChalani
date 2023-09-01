
import { Sizes } from '../props';
import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';
import { commonFormStyle } from './formProps';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  fieldSize?: Sizes;
}

const StyledSelect = styled.select<SelectProps>`
  ${commonFormStyle}
`;

export default function Select({ fieldSize = Sizes.md, ...args }: SelectProps) {
  return <StyledSelect {...args} fieldSize={fieldSize} />;
}
