import Box from './Box';
import styled, { css } from 'styled-components';

interface Props {
  inline?: boolean;
  align?: 'center' | 'flex-start' | 'flex-end' | 'unset' | 'initial';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'initial' | 'unset';
  justify?:
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'unset'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
  className?: string;
}

const alignStyles = css<Props>`
  align-items: ${(props) => props.align};
`;

const directionStyles = css<Props>`
  flex-direction: ${(props) => props.direction};
`;

const justifyStyles = css<Props>`
  justify-content: ${(props) => props.justify};
`;

const FlexBox = styled(Box) <Props>`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  ${(props) => props.align && alignStyles}
  ${(props) => props.direction && directionStyles}
    ${(props) => props.justify && justifyStyles}
`;
FlexBox.defaultProps = {
  inline: false,
  align: 'flex-start',
  direction: 'row',
  justify: 'unset'
};

export default FlexBox;
