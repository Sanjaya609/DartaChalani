export type Variant = 'contain' | 'cover' | 'fill' | 'none' | 'scaleDown'

export const VariantClassMapping: Record<Variant, string> = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  scaleDown: 'object-scale-down',
}
