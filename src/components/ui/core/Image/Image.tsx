import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React, { ImgHTMLAttributes } from 'react'
import { Variant, VariantClassMapping } from './Image.schema'
import { useFallbackImage } from './useFallbackImage'

export interface Props
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  variant?: Variant
  className?: string
  src: string
  alt: string
  fallbackImage?: string
}

/**
 * Returns an object that can
 * be spread onto an img tag
 * @param {String} variant
 * @param {String} className
 * @param {String} src
 * @param {String} fallbackImage
 * @param {String} alt
 * @param {String} loading
 * @returns {HTMLImageElement}  Image
 */
const Image = React.forwardRef<React.MutableRefObject<HTMLImageElement>, Props>(
  (props, ref) => {
    const {
      src,
      variant = 'contain',
      className,
      loading = 'lazy',
      fallbackImage,
      ...restProps
    } = props
    const computedClasses = getComputedClassNames(
      VariantClassMapping[variant],
      className
    )

    const imgSources = useFallbackImage(src, fallbackImage)
    return React.createElement('img', {
      ...restProps,
      ...imgSources,
      ref,
      className: computedClasses,
      loading,
    })
  }
)

Image.displayName = 'Image'

export { Image }
