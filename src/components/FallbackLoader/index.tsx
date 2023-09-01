import React from 'react'
import LoaderLogo from '../../assets/image/logo.png'
import i18next from 'i18next'

interface FallbackProps {
  h?: number
  styles?: React.CSSProperties
}

export default function FallbackLoader({ h, styles }: FallbackProps) {
  return (
    <div
      className={`relative w-100 h-${h || '100'
        } d-flex flex-column align-items-center justify-content-center`}
      style={styles}
    >
      <img src={LoaderLogo} alt="Loader" />

      <div className="mt-1">
        <div className="mr-2 font-semibold text-gray-16">
          {' '}
          {i18next?.language === 'en' ?
            'Please wait. Loading data' :
            'कृपया पर्खनुहोस्। डाटा लोड हुदै छ'
          }
        </div>
        <div
          className="mr-2 mb-1 inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
        <div
          className="mr-2 mb-1  inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
        <div
          className="mr-2 mb-1 inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
      </div>
    </div >
  )
}
