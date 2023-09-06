import green from './green'
import { ColorBase } from './prop'
import red from './red'

const base: ColorBase = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#2460B9',
  secondary: '#143566',
  green: green[40] as string,
  danger: red[48] as string,
}
export default base
