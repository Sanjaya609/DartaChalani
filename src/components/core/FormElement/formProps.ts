import { css } from 'styled-components';
import { Sizes } from '../props';

export interface FormProps {
  fieldSize?: Sizes;
}

export interface FormStyleProps {
  borderRadius: string;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
  placeHolderColor: string;
  focusBorderColor: string;
  readOnlyBgColor: string;
  iconColor: string;
  // iconSize:string;
}

export const formPropertyStyles: FormStyleProps = {
  borderRadius: '.125rem',
  textColor: '#212529',
  borderColor: '#adb5bd',
  backgroundColor: 'white',
  placeHolderColor: '#ADB5BD',
  focusBorderColor: '#1E88E5',
  readOnlyBgColor: '#DEE2E6',
  iconColor: '#ADB5BD'
};

export function componentFormStyle(fieldSize: Sizes) {
  switch (fieldSize) {
    case Sizes.md:
      return css`
        padding: 0.3rem 0.75rem;
        font-size: 0.875rem;
      `;
    case Sizes.sm:
      return css`
        padding: 0.25rem 0.7rem;
        font-size: 0.75rem;
      `;
    default:
      return css`
        padding: 0.3rem 0.75rem;
        font-size: 0.875rem;
      `;
  }
}

export const commonFormStyle = css<FormProps>`
  width: 100%;
  border-radius: ${formPropertyStyles.borderRadius};
  border: 1px solid ${formPropertyStyles.borderColor};
  color: ${formPropertyStyles.textColor};
  background-color: ${formPropertyStyles.backgroundColor};
  &::placeholder {
    color: ${formPropertyStyles.placeHolderColor};
  }
  &:focus-visible,
  &:focus-within {
    outline: none;
    border: 1px solid ${formPropertyStyles.focusBorderColor};
  }

  ${(props) => {
    return `
      ${componentFormStyle(props.fieldSize as Sizes)}
    
    `;
  }};
`;
