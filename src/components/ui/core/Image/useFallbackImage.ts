import { useState } from 'react'

/**
 * if src fails to load then load the fallback image
 * Returns an object that can
 * be spread onto an img tag
 * @param {String} img
 * @param {String} fallbackImage
 * @returns {Object} { src: String, onError: Func }
 */
export const useFallbackImage = (
  img: string,
  fallbackImage: string | undefined
): object => {
  const [src, setImg] = useState<string>(img)

  const onError = () => {
    setImg(fallbackImage ?? '')
  }

  return { src, onError }
}
