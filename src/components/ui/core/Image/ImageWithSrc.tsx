import PreviewUnavailable from '@/assets/img/preview-unavailable.jpg'
import React, { InputHTMLAttributes, useState } from 'react'
import { Image } from './Image'
import Spinner, { ISpinnerProps } from '../../Spinner/Spinner'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'

interface Props extends InputHTMLAttributes<HTMLImageElement> {
  className?: string
  width?: string
  height?: string
  onClick?: () => void
  onErrorImage?: string
  noImageContent?: string
  showSpinner?: boolean
  spinnerProps?: ISpinnerProps
}

const ImageWithSrc = React.forwardRef<
  React.MutableRefObject<HTMLImageElement>,
  Props
>((props, ref) => {
  const {
    className,
    onClick,
    noImageContent,
    showSpinner,
    spinnerProps,
    src,
    ...restProps
  } = props

  const [loading, setLoading] = useState(true)
  const computedClassName = getComputedClassNames(className, {
    hidden: showSpinner && loading,
  })

  return (
    <>
      {loading && showSpinner && <Spinner {...spinnerProps} />}
      <Image
        onLoad={() => setLoading(false)}
        {...restProps}
        ref={ref}
        src={src || PreviewUnavailable}
        alt="profile"
        className={computedClassName}
        onError={(event) => {
          ;(event.target as HTMLImageElement).src =
            noImageContent || PreviewUnavailable
        }}
        onClick={onClick}
      />
    </>
  )
})

export default ImageWithSrc
