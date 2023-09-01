import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h4' | 'h5' | 'h6' | 'p' | 'display1' | 'display2';
  children?: React.ReactNode;
  className?: string;
  typeface?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: string;
}

const fontStyles = {
  regular: {
    fontWeight: 400
  },
  medium: {
    fontWeight: 500
  },
  semiBold: {
    fontWeight: 600
  },

  bold: {
    fontWeight: 700
  }
};

const commonTextStyle = css<Props>`
  ${(props) => (props.typeface ? fontStyles[props.typeface] : fontStyles.regular)}
  color:${(props) => (props.color ? props.color : '#000')};
`;
const Heading1 = styled.h1<Props>`
  ${commonTextStyle}
  font-size:3rem;
`;

const Heading2 = styled.h2<Props>`
  ${commonTextStyle}
  font-size:2rem;
`;

const Heading3 = styled.h3<Props>`
  ${commonTextStyle}
  font-size:1.5rem; // 24px
`;

const Heading4 = styled.h4<Props>`
  ${commonTextStyle}
  font-size:1.25rem; // 20px
`;

const Heading5 = styled.h5<Props>`
  ${commonTextStyle}
  font-size:1.125rem; // 18px
`;

const Heading6 = styled.h6<Props>`
  ${commonTextStyle}
  font-size:1rem; // 16px
`;

const Body = styled.p<Props>`
  ${commonTextStyle}
  font-size:1rem; // 16px
`;

const Display1 = styled.p<Props>`
  ${commonTextStyle}
  font-size:.875rem; // 14px
`;

const Display2 = styled.p<Props>`
  ${commonTextStyle}
  font-size:.75rem; // 12px
`;

const TextDefaults: Props = {
  variant: 'p',
  color: '#000'
};

function Text(props: Props) {
  const args = { ...TextDefaults, ...props };

  switch (props.variant) {
    case 'h1':
      return <Heading1 {...args}>{props.children}</Heading1>;

    case 'h2':
      return <Heading2 {...args}>{props.children}</Heading2>;

    case 'h3':
      return <Heading3 {...args}>{props.children}</Heading3>;

    case 'h4':
      return <Heading4 {...args}>{props.children}</Heading4>;

    case 'h5':
      return <Heading5 {...args}>{props.children}</Heading5>;

    case 'h6':
      return <Heading6 {...args}>{props.children}</Heading6>;

    case 'display1':
      return <Display1 {...args}>{props.children}</Display1>;

    case 'display2':
      return <Display2 {...args}>{props.children}</Display2>;

    default:
      return <Body {...args}>{props.children}</Body>;
  }
}

export default Text;
