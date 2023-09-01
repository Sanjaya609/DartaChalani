export interface ColorTheme {
  primary: string;
  secondary: string;
  error: string;
  onErrorText: string;
  onErrorIcon: string;
  success: string;
  onSuccessIcon: string;
  onSuccessText: string;
  surface: string;
  background: string;
  onPrimary: string;
  onSecondary: string;
  onSurface: string;
  onBackground: string;
  border: string;
  onNormalText: string;
  component: {
    table: {
      text: string;
      heading: string;
      alternate: string;
    };
  };
}

export interface Typeface {
  fontWeight: string;
  fontFamily: string;
}

export interface Fonts {
  regular: Typeface;
  medium: Typeface;
  semiBold: Typeface;
  bold: Typeface;
}

export interface Spacing {
  base: number;
  double: number;
}

export interface Button {
  variant: 'outlined' | 'contained' | 'text';
}
export interface Panel {
  background: string;
}
