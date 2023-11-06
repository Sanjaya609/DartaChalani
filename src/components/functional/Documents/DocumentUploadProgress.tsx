import { Box } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface IDocumentUploadProgressProps {
  value: number
}

const DocumentUploadProgress = (props: IDocumentUploadProgressProps) => {
  const { value } = props
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/[0.6]  dark:bg-slate-950/80"></div>
      <div className="fixed left-[50%] top-[50%] z-50  w-[20%] translate-x-[-50%] translate-y-[-50%]">
        <CircularProgressbarWithChildren
          value={value}
          minValue={0}
          maxValue={100}
          styles={buildStyles({
            pathColor: '#143566',
          })}
        >
          <Text className="text-white" variant="h2" typeface="bold">
            {value}%
          </Text>

          <Box className="mt-1">
            <Box as={'span'} className="mr-2 text-xl font-semibold text-white">
              {' '}
              {getTextByLanguage('UPLOADING', 'अपलोड हुदै छ')}
            </Box>
            <Box
              as={'span'}
              className="mb-1 mr-2 inline-block h-1 w-1 animate-ping rounded-full bg-white text-xl duration-1000 ease-in-out"
            />
            <Box
              as={'span'}
              className="mb-1 mr-2  inline-block h-1 w-1 animate-ping rounded-full bg-white text-xl duration-1000 ease-in-out"
            />
            <Box
              as={'span'}
              className="mb-1 mr-2 inline-block h-1 w-1 animate-ping rounded-full bg-white text-xl duration-1000 ease-in-out"
            />
          </Box>
        </CircularProgressbarWithChildren>
      </div>
    </>
  )
}

export default DocumentUploadProgress
