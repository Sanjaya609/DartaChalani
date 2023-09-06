export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  // | 'body1'
  // | 'body2'
  // | 'button'
  | 'small'
  | 'paragraph'
  | 'label'

export type TextAs =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'p'
  | 'b'
  | 'strong'
  | 'i'
  | 'em'
  | 'mark'
  | 'small'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'code'
  | 'label'

export type Align =
  | 'center'
  | 'inherit'
  | 'justify'
  | 'left'
  | 'right'
  | 'start'
  | 'end'

export const VariantMapping: Record<Variant, TextAs> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  subtitle3: 'h6',
  small: 'small',
  paragraph: 'p',
  label: 'label',
}

export const VariantClassMapping: Record<Variant, string> = {
  h1: 'text-5xl font-semibold leading-130', // font-size: 3rem/* 48px */;
  h2: 'text-4xl font-semibold leading-130', // font-size: 2.25rem/* 36px */;
  h3: 'text-2xl font-semibold leading-130', // font-size: 1.5rem/* 24px */;
  h4: 'text-xl font-semibold leading-130', // font-size: 1.25rem/* 20px */;
  h5: 'text-lg font-semibold leading-130', // font-size: 1.125rem/* 18px */;
  h6: 'text-base font-semibold leading-130', // font-size: 1rem/* 16px */;
  subtitle1: 'text-base font-semibold leading-5', // font-size: 1rem/* 16px */;
  subtitle2: 'text-sm font-medium leading-6', // font-size: 0.875rem/* 14px */;
  subtitle3: 'text-sm leading-4', // font-size: 0.875rem/* 14px */;
  small: 'text-xs font-regular leading-6', // font-size: 0.75rem/* 12px */;
  paragraph: 'text-base font-normal', // font-size: 1rem/* 16px */;
  label: 'text-sm font-normal leading-4', // font-size: 0.875rem/* 14px */;
}

export const AlignClassMapping: Record<Align, string> = {
  left: 'text-left',
  right: 'text-right',
  justify: 'text-justify',
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
  inherit: '',
}
