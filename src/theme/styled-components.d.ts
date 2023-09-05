import 'styled-components'
import { ColorBase } from './colors/prop'
import { Fonts, Spacing } from './interface'

declare module 'styled-components' {
  export interface DefaultTheme {
    id: string
    spacing: Spacing
    color: ColorBase
    fonts: Fonts
  }
}
