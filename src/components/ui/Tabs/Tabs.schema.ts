export type TypesVariant =
  | 'default'
  | 'shadow'
  | 'bottom-border'
  | 'bottom-border-bg'

export type Display = 'default' | 'block'
export type Theme = 'primary' | 'default' | 'warning' | 'success' | 'danger'

export const TabStatesMapping: Record<TypesVariant, string> = {
  default:
    'border-b-2 text-gray-16 border-primary-16  focus:outline-none focus:ring-0 font-medium ',
  shadow:
    ' m-2  text-cool-gray-800 bg-white rounded shadow-sm  focus:outline-none focus:ring-0 font-medium',

  'bottom-border':
    'text-primary-16 shadow-bottom  focus:outline-none focus:ring-0 font-medium mb-0.5',
  'bottom-border-bg':
    'bg-primary-50 text-primary-16 shadow-bottom  focus:outline-none focus:ring-0 font-medium mb-0.5',
}

export const TabDisplayClassMapping: Record<TypesVariant, string> = {
  // default: ' border border-cool-gray-300',
  default: 'border-b-2 w-full',
  shadow: 'border border-cool-gray-300',
  'bottom-border': 'border-b border-cool-gray-300',
  'bottom-border-bg': 'border-b border-cool-gray-300',
}
export const CountBgClassMapping: Record<TypesVariant, string> = {
  default: ' bg-primary-100 ',
  shadow: 'bg-cool-gray-200',
  'bottom-border': 'bg-primary-100',
  'bottom-border-bg': 'bg-primary-100',
}
export const CountColorClassMapping: Record<TypesVariant, string> = {
  default: ' text-primary-16',
  shadow: 'text-cool-gray-600',
  'bottom-border': '  text-primary-16',
  'bottom-border-bg': ' text-primary-16',
}

export const IconColorClassMapping: Record<TypesVariant, string> = {
  default: 'text-primary-200',
  shadow: 'text-cool-gray-600 ',
  'bottom-border': ' text-primary-200',
  'bottom-border-bg': 'text-primary-200',
}