import React from 'react'
import { Box } from '@/components/ui/core/Box'
import LoaderLogo from '@/assets/img/logo.png'
import { getTextByLanguage } from '@/lib/i18n/i18n'

interface FallbackProps {
  h?: number
  styles?: React.CSSProperties
}

export default function FallbackLoader({ h, styles }: FallbackProps) {
  return (
    <Box
      className={`relative w-full h-${
        h || 'full'
      } flex flex-col items-center justify-center`}
      style={styles}
    >
      <img src={LoaderLogo} alt="Loader" />

      <Box className="mt-1">
        <Box as={'span'} className="mr-2 font-semibold text-gray-16">
          {' '}
          {getTextByLanguage(
            'Please wait. Loading data',
            'कृपया पर्खनुहोस्। डाटा लोड हुदै छ'
          )}
        </Box>
        <Box
          as={'span'}
          className="mb-1 mr-2 inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
        <Box
          as={'span'}
          className="mb-1 mr-2  inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
        <Box
          as={'span'}
          className="mb-1 mr-2 inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
      </Box>
    </Box>
  )
}
