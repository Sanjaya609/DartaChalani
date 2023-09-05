import { DefaultTheme } from 'styled-components'
import { base } from './colors'
import { ColorBase } from './colors/prop'
import { Fonts, Spacing } from './interface'

export const THEME_ID = 'default-light'

const COLOR_THEME: ColorBase = {
  ...base,
}

const FONT_THEME: Fonts = {
  regular: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  medium: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  semiBold: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  bold: {
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
}

const SPACING_THEME: Spacing = {
  base: 8,
  double: 16,
}

export const THEME: DefaultTheme = {
  id: THEME_ID,
  color: COLOR_THEME,
  spacing: SPACING_THEME,
  fonts: FONT_THEME,
}

export const SCREEN_SIZE = {
  mobile: '480',
  tablet: '768',
  large: '992',
  extraLarge: '1200',
}

export const MAX_WIDTH_STYLE = {
  mobile: `(max-width: ${SCREEN_SIZE.mobile}px)`,
  tablet: `(max-width: ${SCREEN_SIZE.tablet}px)`,
  large: `(max-width: ${SCREEN_SIZE.large}px)`,
  extraLarge: `(max-width: ${SCREEN_SIZE.extraLarge}px)`,
}
