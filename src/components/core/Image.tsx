import React, { ImgHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'contain' | 'cover';
}
const imageVariantStyle = (variant: 'contain' | 'cover') => {
  switch (variant) {
    case 'contain':
      return css`
        object-fit: contain;
      `;
    default:
      return css`
        object-fit: cover;
      `;
  }
};
const StyledImage = styled.img<ImageProps>`
   {
    ${({ variant }) => {
      return variant && imageVariantStyle(variant);
    }}
  }
`;

export default function Image({ variant, ...props }: ImageProps): JSX.Element {
  return <StyledImage {...props} variant={variant} loading="lazy" />;
}
