export interface Typeface {
  fontWeight: string
  fontFamily: string
}

export interface Fonts {
  regular: Typeface
  medium: Typeface
  semiBold: Typeface
  bold: Typeface
}

export interface Spacing {
  base: number
  double: number
}

export interface Button {
  variant: 'outlined' | 'contained' | 'text'
}
export interface Panel {
  background: string
}
