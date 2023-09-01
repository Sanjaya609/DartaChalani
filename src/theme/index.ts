import { DefaultTheme } from 'styled-components';
import { blue, coolGray, green, red } from './colors';
import { ColorTheme, Fonts, Spacing } from './interface';
export const LIGHT_THEME_ID = 'default-light';
export const DARK_THEME_ID = 'default-dark';

declare module 'styled-components' {
  export interface DefaultTheme {
    id: string;
    spacing: Spacing;
    color: ColorTheme;
    fonts: Fonts;
  }
}

//light
export const LIGHT_COLOR_THEME: ColorTheme = {
  primary: '#1565c0',
  onPrimary: '#000000',
  secondary: '#2f6fcf',
  onSecondary: '#000000',
  onSurface: coolGray[800],
  surface: '#ffffff',
  background: coolGray[50],
  onBackground: coolGray[600],
  error: red[50],
  onErrorText: '#cf6679',
  onErrorIcon: '#cf6679',
  success: green[50],
  onSuccessIcon: green[600],
  onSuccessText: green[900],
  border: coolGray[300],
  onNormalText: '#000',
  component: {
    table: {
      text: coolGray[800],
      heading: coolGray[600],
      alternate: coolGray[100]
    }
  }
};
const FONT_THEME: Fonts = {
  regular: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular'
  },
  medium: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular'
  },
  semiBold: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular'
  },
  bold: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular'
  }
};
const DARK_COLOR_THEME: ColorTheme = {
  primary: blue[800],
  onPrimary: '#000000',
  secondary: '#2f6fcf',
  onSecondary: '#000000',
  surface: coolGray[800],
  onSurface: coolGray[700],
  background: coolGray[900],
  onBackground: '#ADB5BD',
  error: '#cf6679',
  onErrorText: '#cf6679',
  onErrorIcon: '#cf6679',
  success: green[50],
  onSuccessIcon: green[600],
  onSuccessText: green[900],
  border: coolGray[600],
  onNormalText: '#fff',
  component: {
    table: {
      text: coolGray[400],
      heading: coolGray[600],
      alternate: coolGray[700]
    }
  }
};

const DARK_SPACING_THEME: Spacing = {
  base: 8,
  double: 16
};

const LIGHT_SPACING_THEME: Spacing = {
  base: 8,
  double: 16
};

export const LIGHT_THEME: DefaultTheme = {
  id: LIGHT_THEME_ID,
  color: LIGHT_COLOR_THEME,
  spacing: LIGHT_SPACING_THEME,
  fonts: FONT_THEME
};

export const DARK_THEME: DefaultTheme = {
  id: DARK_THEME_ID,
  color: DARK_COLOR_THEME,
  spacing: DARK_SPACING_THEME,
  fonts: FONT_THEME
};
